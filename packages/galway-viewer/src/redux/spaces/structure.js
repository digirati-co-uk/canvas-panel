import { createActions, handleActions } from 'redux-actions';
import update from 'immutability-helper';
import { takeEvery, put } from 'redux-saga/effects';
import {
  CurrentLevel,
  depthOf,
  findLevel,
  flattenAll,
  getBreadCrumbs,
  levelKeys,
  manifestToStructure,
  mapDepths,
  matchesRange,
  matchRangeReducer,
  processStructure,
  sortByKey,
} from './structure.utility';
import { MANIFEST_SUCCESS } from './manifest';

const IMPORT_STRUCTURE = 'IMPORT_STRUCTURE';
const SET_STRUCTURE_DEPTH = 'UPDATE_DEPTH';
const INCREASE_STRUCTURE_DEPTH = 'INCREASE_STRUCTURE_DEPTH';
const DECREASE_STRUCTURE_DEPTH = 'DECREASE_STRUCTURE_DEPTH';

const {
  importStructure,
  setStructureDepth,
  increaseStructureDepth,
  decreaseStructureDepth,
} = createActions({
  [IMPORT_STRUCTURE]: structure => ({ structure }),
  [SET_STRUCTURE_DEPTH]: depth => ({ depth }),
  [INCREASE_STRUCTURE_DEPTH]: () => ({}),
  [DECREASE_STRUCTURE_DEPTH]: () => ({}),
});

const defaultState = {
  structure: [],
  maxDepth: 0,
  depthMap: {},
  flatItems: [],
  depth: 0,
  topKeys: [],
  breadcrumbs: [],
};

const reducer = handleActions(
  {
    [importStructure]: (state, { payload: { structure } }) => {
      const processedStructure = processStructure(structure);
      const maxDepth = depthOf(processedStructure);
      const depthMap = mapDepths(processedStructure, maxDepth);

      return update(state, {
        structure: { $set: processedStructure },
        maxDepth: { $set: maxDepth },
        flatItems: { $set: flattenAll(processedStructure).sort(sortByKey) },
        topKeys: { $set: levelKeys(depthMap, 0) },
        depthMap: { $set: depthMap },
      });
    },

    [setStructureDepth]: (state, { payload: { depth } }) =>
      update(state, {
        depth: { $set: depth },
      }),

    [increaseStructureDepth]: state =>
      update(state, {
        depth: { $apply: n => (n === state.maxDepth ? state.maxDepth : n + 1) },
      }),

    [decreaseStructureDepth]: state =>
      update(state, {
        depth: { $apply: n => (n === 0 ? 0 : n - 1) },
      }),
  },
  defaultState
);

function mapStateToProps(state) {
  const structure = state.structure.structure;
  const canvasIndex = state.manifest.currentCanvas;
  const depth = state.structure.depth;
  const depthMap = state.structure.depthMap;
  const topKeys = state.structure.topKeys;
  const props = {};

  if (topKeys.length === 0) {
    return {};
  }

  // Current level
  props.structure = structure;
  props.flatItems = state.structure.flatItems;
  props.currentViews = findLevel(structure, canvasIndex, depth);
  props.currentKeys = levelKeys(depthMap, depth);
  props.current = new CurrentLevel(props.currentViews, props.currentKeys);

  props.activeItem = props.currentViews.reduce(matchRangeReducer(canvasIndex));
  props.breadcrumbs = getBreadCrumbs(props.structure, props.activeItem.key);

  // Top level
  props.top = structure.filter(range => matchesRange(range, canvasIndex)).pop();
  props.topKeys = topKeys;
  props.activeItemIsTop = props.topKeys.indexOf(props.activeItem.key) !== -1;

  props.depth = depth;

  props.canvasIndex = canvasIndex;

  return props;
}

function* importManifestStructure({ payload: { manifestUrl, manifest } }) {
  if (manifest.structures) {
    yield put(importStructure(manifestToStructure(manifest)));
  }
}

function* saga() {
  yield takeEvery(MANIFEST_SUCCESS, importManifestStructure);
}

export {
  IMPORT_STRUCTURE,
  SET_STRUCTURE_DEPTH,
  INCREASE_STRUCTURE_DEPTH,
  DECREASE_STRUCTURE_DEPTH,
  importStructure,
  setStructureDepth,
  increaseStructureDepth,
  decreaseStructureDepth,
  mapStateToProps,
  saga,
  reducer,
};
