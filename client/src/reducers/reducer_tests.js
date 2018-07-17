import { FETCH_TESTS, FETCH_TEST, RUN_TEST } from '../actions/types';

const INITIAL_STATE = { all: [], test: null, testValidation: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FETCH_TEST:
    return { ...state, test: action.payload.data };

  case FETCH_TESTS:
    return { ...state, all: action.payload.data }

  case RUN_TEST:
    return { ...state, testValidation: action.payload.data }

  default:
    return state;
  }
}