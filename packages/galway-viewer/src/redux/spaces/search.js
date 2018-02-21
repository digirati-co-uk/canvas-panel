/**
 * @flow
 */
import Manifesto from 'manifesto.js';
import { AnnotationSelector } from '@canvas-panel/core';
import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import update from 'immutability-helper';
import { MANIFEST_SUCCESS, manifestSetCanvasId } from './manifest';

type SearchResource = string;

type Motivation =
  | 'painting'
  | 'non-painting'
  | 'commenting'
  | 'describing'
  | 'tagging'
  | 'linking';

type SearchHit = {
  annotations: Array<string>,
  before: string,
  after: string,
  term: string,
};

type Annotation = {
  annotation: Manifesto.Annotation,
  on: AnnotationSelector,
};

type SearchHitSelector = {
  exact: string,
  prefix: string,
  suffix: string,
};

type SearchQueryResult = {
  within: {
    total: number,
    first?: SearchResource,
    last?: SearchResource,
  },

  next: SearchResource | null,
  previous: SearchResource | null,
  startIndex: number | null,

  resources: Array<Manifesto.Annotation>,
  hits: Array<SearchHit>,
  selectors: Array<SearchHitSelector>,
  resourceMap: { [string]: Annotation },
  canvasMap: { [string]: Array<Manifesto.Annotation> },
};

type Query = {
  q: string | Array<string> | null,
  motivation?: Motivation | Array<Motivation> | null,
  date?: string | Array<string> | null,
  user?: string | Array<string> | null,
};

const SEARCH_ENABLE = 'SEARCH_ENABLE';
const SEARCH_CANCEL = 'SEARCH_CANCEL';
const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_REQUEST_STARTED = 'SEARCH_REQUEST_STARTED';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_ERROR = 'SEARCH_ERROR';
const SEARCH_GO_TO_CANVAS = 'SEARCH_GO_TO_CANVAS';
const SEARCH_NEXT_CANVAS = 'SEARCH_NEXT_CANVAS';
const SEARCH_PREV_CANVAS = 'SEARCH_PREV_CANVAS';
const SEARCH_GO_TO = 'SEARCH_GO_TO';
const SEARCH_NEXT = 'SEARCH_NEXT';
const SEARCH_PREV = 'SEARCH_PREV';
const SEARCH_HIGHLIGHT = 'SEARCH_HIGHLIGHT';
const SEARCH_APPLY_FILTER = 'SEARCH_APPLY_FILTER'; // future.

const noop = e => e;

const {
  searchEnable,
  searchCancel,
  searchRequest,
  searchRequestStarted,
  searchSuccess,
  searchError,
  searchGoToCanvas,
  searchNextCanvas,
  searchPrevCanvas,
  searchGoTo,
  searchNext,
  searchPrev,
  searchHighlight,
  searchApplyFilter,
} = createActions({
  [SEARCH_ENABLE]: (service: string) => ({ service }),
  [SEARCH_CANCEL]: noop,
  [SEARCH_REQUEST]: (query: Query) => ({
    query: constructSearchQuery(query),
  }),
  [SEARCH_REQUEST_STARTED]: (query: string) => ({ query }),
  [SEARCH_SUCCESS]: (id: string, result: SearchQueryResult) => ({
    id,
    result,
  }),
  [SEARCH_ERROR]: (message: string) => ({ error: message }),
  [SEARCH_GO_TO_CANVAS]: (canvasId: string) => ({ canvasId }),
  [SEARCH_NEXT_CANVAS]: noop,
  [SEARCH_PREV_CANVAS]: noop,
  [SEARCH_GO_TO]: (id: string) => ({ id }),
  [SEARCH_NEXT]: noop,
  [SEARCH_PREV]: noop,
  [SEARCH_HIGHLIGHT]: noop,
  [SEARCH_APPLY_FILTER]: noop,
});

type State = {
  service: string | null,
  currentResultId: string | null,
  currentQuery: string | null,
  isLoading: boolean,
  queries: { [string]: SearchQueryResult },
  error: string | null,
};

const defaultState: State = {
  service: null,
  currentResultId: null,
  currentQuery: null,
  isLoading: false,
  queries: {},
  error: null,
};

const reducer = handleActions(
  {
    [searchEnable]: (state, { payload: { service } }) =>
      update(state, { service: { $set: service } }),

    [searchCancel]: state => update(state, { currentQuery: { $set: null } }),

    [searchRequest]: (state, { payload: { query } }) =>
      update(state, {
        currentQuery: { $set: query },
      }),

    [searchRequestStarted]: state =>
      update(state, {
        isLoading: { $set: true },
      }),

    [searchSuccess]: (state, { payload: { id, result } }) =>
      update(state, {
        isLoading: { $set: false },
        queries: {
          [id]: { $set: result },
        },
      }),

    [searchError]: (state, { payload: { error } }) =>
      update(state, { error: { $set: error } }),

    [searchGoTo]: (state, { payload: { id } }) =>
      update(state, { currentResultId: { $set: id } }),
  },
  defaultState
);

async function fetchSearchResults(query: string) {
  const response = await fetch(query);
  return await response.json();
}

function* executeSearch({ queries, service }, query) {
  if (queries[query]) {
    return queries[query];
  }
  yield put(searchRequestStarted(query));

  const fullQuery = `${service}?${query}`;
  const results = yield call(fetchSearchResults, fullQuery);

  const searchQueryResults = createSearchQueryResult(results);

  yield put(searchSuccess(query, searchQueryResults));

  return searchQueryResults;
}

function* runSearchQuery({ payload: { query } }) {
  const state = yield select();

  if (!state.search.service) {
    return;
  }

  const searchQueryResults = yield call(executeSearch, state.search, query);

  if (searchQueryResults.resources[0]) {
    yield put(searchGoTo(searchQueryResults.resources[0].id)); // Reset flow back to 0.
    const canvas = searchQueryResults.resources[0].getOn().split('#')[0];
    if (canvas) {
      yield put(manifestSetCanvasId(canvas));
    }
  }
}

function* searchNavigation({ type }) {
  const offsets = {
    [SEARCH_PREV_CANVAS]: -1,
    [SEARCH_NEXT_CANVAS]: 1,
  };
  const offset = offsets[type];
  const state = yield select();
  const currentResultId = state.search.currentResultId;
  const results = getResults(state.search);
  if (!results) {
    return;
  }
  const keys = Object.keys(results.resourceMap);
  const currentIndex = keys.indexOf(currentResultId);
  const targetIndex = currentIndex + offset;
  if (keys[targetIndex]) {
    yield put(
      searchGoTo(results.resourceMap[keys[targetIndex]].__jsonld['@id'])
    );
  }
}

function getResults(searchState: State): SearchQueryResult | null {
  const currentQuery = searchState.currentQuery;
  if (!currentQuery) {
    return null;
  }
  return searchState.queries[currentQuery];
}

function* searchCanvasNavigation({ type, payload }) {
  const offsets = {
    [SEARCH_PREV_CANVAS]: -1,
    [SEARCH_NEXT_CANVAS]: 1,
  };
  const offset = offsets[type];
  const state = yield select();
  const currentResultId = state.search.currentResultId;
  const results = getResults(state.search);
  if (!results) {
    return;
  }
  if (type === SEARCH_GO_TO_CANVAS) {
    yield put(searchGoTo(results.canvasMap));
    return;
  }

  const currentResult = results.resourceMap[currentResultId];
  if (!currentResult) {
    return;
  }
  if (type === SEARCH_GO_TO_CANVAS) {
    const canvasId = payload.canvasId;
    if (results.canvasMap[canvasId]) {
      yield put(searchGoTo(results.canvasMap[canvasId][0].id));
    }
    return;
  }

  const canvas: string = currentResult.getOn().split('#')[0];
  const keys = Object.keys(results.canvasMap);
  const currentIndex = keys.indexOf(canvas);
  const targetIndex = currentIndex + offset;
  if (targetIndex >= 0 && keys[targetIndex]) {
    const id =
      results.canvasMap[keys[targetIndex]][0] &&
      results.canvasMap[keys[targetIndex]][0].annotation
        ? results.canvasMap[keys[targetIndex]][0].annotation.id
        : null;
    yield put(searchGoTo(id));
    yield put(manifestSetCanvasId(keys[targetIndex]));
  }
}

function* importSearchService({ payload: { manifesto } }) {
  const searchService: Manifesto.Service | null = manifesto
    ? manifesto.getSearchService()
    : null;

  if (searchService && searchService.__jsonld) {
    yield put(searchEnable(searchService.__jsonld['@id']));
  }
}

function* saga(): Generator<*, *, *> {
  yield all([
    // Detect and add search service
    takeEvery(MANIFEST_SUCCESS, importSearchService),

    // Handle search requests
    takeEvery(SEARCH_REQUEST, runSearchQuery),

    // Canvas Navigation (reduced to SEARCH_GO_TO)
    takeEvery(SEARCH_GO_TO_CANVAS, searchCanvasNavigation),
    takeEvery(SEARCH_NEXT_CANVAS, searchCanvasNavigation),
    takeEvery(SEARCH_PREV_CANVAS, searchCanvasNavigation),

    // Search navigation (also reduced to SEARCH_GO_TO)
    takeEvery(SEARCH_NEXT, searchNavigation),
    takeEvery(SEARCH_PREV, searchNavigation),
  ]);
}

function createSearchQueryResult(jsonLd): SearchQueryResult {
  const within = jsonLd.within
    ? {
        total: jsonLd.within.total,
        first: jsonLd.within.first,
        last: jsonLd.within.last,
      }
    : {
        total: jsonLd.hits.length || 0,
      };

  const next = (jsonLd.next: SearchResource);
  const previous = (jsonLd.previous: SearchResource);

  const startIndex = jsonLd.startIndex ? parseInt(jsonLd.startIndex, 10) : null;

  const resources = (jsonLd.resources || []).map(resource =>
    Manifesto.Utils.createAnnotation(resource)
  );

  const resourceMap = resources.reduce(
    (map, resource: Manifesto.Annotation) => {
      map[resource.id] = resource;
      return map;
    },
    {}
  );

  const canvasMap = resources.reduce((map, resource: Manifesto.Annotation) => {
    const target = resource.getOn().split('#')[0];
    map[target] = map[target] ? map[target] : [];
    map[target].push({
      annotation: resource,
      on: AnnotationSelector.parse(resource.getTarget() || resource.getOn()),
    });
    return map;
  }, {});

  const hits = (jsonLd.hits || []).map(
    hit =>
      ({
        annotations: hit.annotations
          .map(id => resourceMap[id] || null)
          .filter(e => e),
        before: hit.before,
        after: hit.after,
        term: hit.term,
      }: SearchHit)
  );

  return {
    within,
    canvasMap,
    resourceMap,
    hits,
    startIndex,
    next,
    previous,
    resources,
    selectors: [], // @todo selector list.?
  };
}

function formatSingleParam(name: string, value: any | Array<any>) {
  if (Array.isArray(value)) {
    return `${name}=${value.join(' ')}`;
  }
  return `${name}=${value}`;
}

function constructSearchQuery(query: Query) {
  const params = [];
  const { q, motivation, date, user } = query;

  if (q) {
    params.push(formatSingleParam('q', q));
  }

  if (motivation) {
    params.push(formatSingleParam('motivation', motivation));
  }

  if (date) {
    params.push(formatSingleParam('date', date));
  }

  if (user) {
    params.push(formatSingleParam('user', user));
  }

  if (params.length === 0) {
    return null;
  }

  return params.join('&');
}

export {
  SEARCH_REQUEST,
  SEARCH_REQUEST_STARTED,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_GO_TO_CANVAS,
  SEARCH_NEXT_CANVAS,
  SEARCH_PREV_CANVAS,
  SEARCH_GO_TO,
  SEARCH_NEXT,
  SEARCH_PREV,
  SEARCH_HIGHLIGHT,
  SEARCH_APPLY_FILTER,
  searchRequest,
  searchRequestStarted,
  searchSuccess,
  searchError,
  searchGoToCanvas,
  searchCancel,
  searchNextCanvas,
  searchPrevCanvas,
  searchGoTo,
  searchNext,
  searchPrev,
  searchHighlight,
  searchApplyFilter,
  saga,
  reducer,
};
