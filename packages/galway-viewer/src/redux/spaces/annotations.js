import { createActions, handleActions } from 'redux-actions';
import { call, all, fork, put, select, takeEvery } from 'redux-saga/effects';
import update from 'immutability-helper';
import { MANIFEST_SET_CANVAS, MANIFEST_SUCCESS } from './manifest';
import AnnotationSelector from '../../../../canvas-panel-core/src/utility/AnnotationSelector';

const IMPORT_ANNOTATION = 'IMPORT_ANNOTATION';
const IMPORT_ANNOTATION_LIST = 'IMPORT_ANNOTATION_LIST';
const SELECT_ANNOTATION = 'SELECT_ANNOTATION';
const DESELECT_ANNOTATION = 'DESELECT_ANNOTATION';
const NEXT_ANNOTATION = 'NEXT_ANNOTATION';
const PREV_ANNOTATION = 'PREV_ANNOTATION';

const {
  importAnnotation,
  selectAnnotation,
  nextAnnotation,
  prevAnnotation,
  deselectAnnotation,
} = createActions({
  [IMPORT_ANNOTATION]: (id, annotation, { type, canvasId }) => ({
    id,
    annotation,
    source: { type, canvasId },
  }),
  [SELECT_ANNOTATION]: (id, type) => ({ id, type }),
  [NEXT_ANNOTATION]: type => ({ type }),
  [PREV_ANNOTATION]: type => ({ type }),
  [PREV_ANNOTATION]: type => ({ type }),
  [DESELECT_ANNOTATION]: () => null,
});

const defaultState = {
  index: {},
  groups: {
    otherContent: [],
    search: [],
  },
  canvasMap: {},
  selected: {
    id: null,
    type: null,
    index: null,
  },
};

function pushOrSetUniqueItemOnMap(state, id, canvasId) {
  if (state[canvasId]) {
    if (state[canvasId].indexOf(id) === -1) {
      return { [canvasId]: { $push: [id] } };
    }
  } else {
    return { [canvasId]: { $set: [id] } };
  }
}

const reducer = handleActions(
  {
    [importAnnotation]: (
      state,
      { payload: { id, annotation, source: { type, canvasId } } }
    ) => {
      const updateMethod = {
        index: {
          [id]: { $set: annotation },
        },
        groups: {
          [type]: { $push: [id] },
        },
      };
      // Add canvas mapping.
      if (canvasId) {
        const toPush = pushOrSetUniqueItemOnMap(state.canvasMap, id, canvasId);
        if (toPush) {
          updateMethod.canvasMap = toPush;
        }
      }
      return update(state, updateMethod);
    },
    [deselectAnnotation]: state =>
      update(state, {
        selected: { $set: defaultState.selected },
      }),
    [selectAnnotation]: (state, { payload: { id, type } }) =>
      update(state, {
        selected: {
          id: { $set: id },
          type: { $set: type },
          index: { $set: state.groups[type].indexOf(id) },
        },
      }),
    [nextAnnotation]: (state, { payload: { type } }) => {
      const index = state.selected.index + 1;
      // Not allow past end.
      if (index >= state.groups[type].length) {
        return state;
      }
      const id = state.groups[type][index];
      return update(state, {
        selected: {
          id: { $set: id },
          type: { $set: type },
          index: { $set: index },
        },
      });
    },
    [prevAnnotation]: (state, { payload: { type } }) => {
      const index = state.selected.index - 1;
      // Not allow past start.
      if (index <= 0) {
        return state;
      }
      const id = state.groups[type][index];
      return update(state, {
        selected: {
          id: { $set: id },
          type: { $set: type },
          index: { $set: index },
        },
      });
    },
  },
  defaultState
);

function* importSingleAnnotation(annotation, { canvasId, type }) {
  const on = annotation.getOn() || annotation.getTarget();

  yield put(
    importAnnotation(
      annotation.id,
      {
        annotation,
        label: annotation.getLabel(),
        on: AnnotationSelector.parse(on),
      },
      { type, canvasId }
    )
  );
}

async function getAllAnnotations(canvas) {
  return await Promise.all([canvas.getOtherContent(), canvas.getAnnotations()])
    .catch(() => [])
    .then(results => results.reduce((arr, item) => [...arr, ...item], []));
}

function* importCanvasAnnotations(canvas) {
  const allAnnotations = yield call(getAllAnnotations, canvas);

  yield all(
    allAnnotations.map(annotationList =>
      all(
        annotationList.getResources().map(annotation =>
          fork(importSingleAnnotation, annotation, {
            canvasId: canvas.id,
            type: 'otherContent',
          })
        )
      )
    )
  );
}

function* importManifestAnnotations({ payload: { manifesto } }) {
  const sequence = manifesto.getSequenceByIndex(0);

  yield all(
    sequence.getCanvases().map(canvas => fork(importCanvasAnnotations, canvas))
  );
}

function* importSingleCanvasAnnotation({ payload: { canvasIndex } }) {
  const state = yield select();
  const manifest = state.manifest.manifesto;
  const canvas = manifest.getSequenceByIndex(0).getCanvasByIndex(canvasIndex);
  yield call(importCanvasAnnotations, canvas);
}

function* saga() {
  yield all([
    // This works, but its slower.
    // takeEvery(MANIFEST_SUCCESS, importManifestAnnotations),
    // This lazy loads them essentially.
    takeEvery(MANIFEST_SET_CANVAS, importSingleCanvasAnnotation),
  ]);
}

export {
  importAnnotation,
  selectAnnotation,
  deselectAnnotation,
  nextAnnotation,
  prevAnnotation,
  reducer,
  saga,
};
