import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import update from 'immutability-helper';

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
  [MANIFEST_REQUEST]: (manifestUrl, locale) => ({ manifestUrl, locale }),
  [MANIFEST_SUCCESS]: (manifestUrl, manifest) => ({ manifestUrl, manifest }),
  [MANIFEST_FAILURE]: (manifestUrl, error) => ({ manifestUrl, error }),
  [MANIFEST_NEXT_CANVAS]: () => {},
  [MANIFEST_PREV_CANVAS]: () => {},
  [MANIFEST_SET_CANVAS]: canvasIndex => ({ canvasIndex }),
});

function* fetchManifestSaga({ payload: { manifestUrl } }) {
  try {
    const manifest = yield call(fetchManifest, manifestUrl);
    yield put(manifestSuccess(manifestUrl, manifest));
  } catch (err) {
    yield put(manifestFailure(manifestUrl, err));
  }
}

function* saga() {
  yield takeEvery(MANIFEST_REQUEST, fetchManifestSaga);
}

const defaultState = {
  isPending: false,
  currentManifest: null,
  jsonLd: null,
  error: false,
  errorMessage: null,
  currentCanvas: 2, // @todo change back to 0
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
    [manifestSuccess]: (state, { payload: { manifestUrl, manifest } }) =>
      update(state, {
        jsonLd: { $set: manifest },
        isPending: { $set: false },
      }),

    // After failure, we store error message.
    [manifestFailure]: (state, { payload: { manifestUrl, error } }) =>
      update(state, {
        isPending: { $set: false },
        error: true,
        errorMessage: error,
      }),

    [manifestNextCanvas]: state =>
      update(state, {
        currentCanvas: { $apply: index => index + 1 },
      }),

    [manifestPrevCanvas]: state =>
      update(state, {
        currentCanvas: { $apply: index => (index === 0 ? 0 : index - 1) },
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
  manifestRequest,
  manifestSuccess,
  manifestFailure,
  manifestNextCanvas,
  manifestPrevCanvas,
  manifestSetCanvas,
  saga,
  reducer,
};
