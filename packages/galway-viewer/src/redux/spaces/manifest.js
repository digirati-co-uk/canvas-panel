import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import update from 'immutability-helper';
import Manifesto from 'manifesto.js';

const MANIFEST_REQUEST = 'MANIFEST_REQUEST';
const MANIFEST_SUCCESS = 'MANIFEST_SUCCESS';
const MANIFEST_FAILURE = 'MANIFEST_FAILURE';
const MANIFEST_NEXT_CANVAS = 'MANIFEST_NEXT_CANVAS';
const MANIFEST_PREV_CANVAS = 'MANIFEST_PREV_CANVAS';
const MANIFEST_SET_CANVAS = 'MANIFEST_SET_CANVAS';

async function fetchManifest(manifestUrl) {
  const manifest = await fetch(manifestUrl);
  if (!manifest) {
    throw Error('No manifest found');
  }
  return await manifest.json();
}

const {
  manifestRequest,
  manifestSuccess,
  manifestFailure,
  manifestNextCanvas,
  manifestPrevCanvas,
  manifestSetCanvas,
} = createActions({
  [MANIFEST_REQUEST]: (manifestUrl, locale, { startCanvas }) => ({
    manifestUrl,
    locale,
    metaData: { startCanvas },
  }),
  [MANIFEST_SUCCESS]: (manifestUrl, manifest, locale) => ({
    manifestUrl,
    manifest,
    manifesto: Manifesto.create(manifest, { locale }),
  }),
  [MANIFEST_FAILURE]: (manifestUrl, error) => ({ manifestUrl, error }),
  [MANIFEST_NEXT_CANVAS]: () => {},
  [MANIFEST_PREV_CANVAS]: () => {},
  [MANIFEST_SET_CANVAS]: canvasIndex => ({ canvasIndex }),
});

function* fetchManifestSaga({
  payload: { manifestUrl, locale, metaData: { startCanvas } },
}) {
  try {
    const manifest = yield call(fetchManifest, manifestUrl);
    yield put(manifestSuccess(manifestUrl, manifest, locale));
    if (startCanvas) {
      yield put(manifestSetCanvas(startCanvas));
    }
  } catch (err) {
    yield put(manifestFailure(manifestUrl, err));
  }
}

function* handleNextCanvas() {
  const state = yield select();
  if (
    state.manifest.jsonLd.sequences[0].canvases.length - 1 >
    state.manifest.currentCanvas
  ) {
    yield put(manifestSetCanvas(state.manifest.currentCanvas + 1));
  }
}

function* handlePrevCanvas() {
  const state = yield select();
  if (state.manifest.currentCanvas > 0) {
    yield put(manifestSetCanvas(state.manifest.currentCanvas - 1));
  }
}

function* saga() {
  yield all([
    takeEvery(MANIFEST_REQUEST, fetchManifestSaga),
    takeEvery(MANIFEST_NEXT_CANVAS, handleNextCanvas),
    takeEvery(MANIFEST_PREV_CANVAS, handlePrevCanvas),
  ]);
}

const defaultState = {
  isPending: false,
  currentManifest: null,
  jsonLd: null,
  error: false,
  errorMessage: null,
  currentCanvas: 0,
};

const reducer = handleActions(
  {
    // Requesting manifest adds its ID to state.
    [manifestRequest]: (state, { payload: { manifestUrl, locale } }) =>
      update(state, {
        currentManifest: { $set: manifestUrl },
        locale: { $set: locale },
        isPending: { $set: true },
      }),

    // After a successful manifest request we store it.
    [manifestSuccess]: (
      state,
      { payload: { manifestUrl, manifest, manifesto, locale } }
    ) =>
      update(state, {
        jsonLd: { $set: manifest },
        manifesto: { $set: manifesto },
        locale: { $set: locale },
        isPending: { $set: false },
      }),

    // After failure, we store error message.
    [manifestFailure]: (state, { payload: { manifestUrl, error } }) =>
      update(state, {
        isPending: { $set: false },
        error: true,
        errorMessage: error,
      }),

    [manifestSetCanvas]: (state, { payload: { canvasIndex } }) =>
      update(state, {
        currentCanvas: { $set: canvasIndex },
      }),
  },
  defaultState
);

export {
  MANIFEST_REQUEST,
  MANIFEST_SUCCESS,
  MANIFEST_FAILURE,
  MANIFEST_NEXT_CANVAS,
  MANIFEST_PREV_CANVAS,
  MANIFEST_SET_CANVAS,
  manifestRequest,
  manifestSuccess,
  manifestFailure,
  manifestNextCanvas,
  manifestPrevCanvas,
  manifestSetCanvas,
  saga,
  reducer,
};
