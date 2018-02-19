// @todo incomplete.
import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import update from 'immutability-helper';

const SUPPLEMENTAL_REQUESTED = 'SUPPLEMENTAL_REQUESTED';
const SUPPLEMENTAL_SUCCESS = 'SUPPLEMENTAL_SUCCESS';
const SUPPLEMENTAL_FAILURE = 'SUPPLEMENTAL_FAILURE';

const defaultState = {
  isPending: false,
  currentSupplemental: null,
  index: {},
  error: false,
  errorMessage: null,
};

const {
  supplementalRequested,
  supplementalSuccess,
  supplementalFailure,
} = createActions({
  [SUPPLEMENTAL_REQUESTED]: annotation => ({ annotation }),
  [SUPPLEMENTAL_SUCCESS]: (annotation, { id, jsonLd }) => ({
    annotation,
    id,
    jsonLd,
  }),
  [SUPPLEMENTAL_FAILURE]: (annotation, { error }) => ({ annotation, error }),
});
