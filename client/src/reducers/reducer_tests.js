import { FETCH_TESTS, FETCH_TEST } from '../actions/types';

const INITIAL_STATE = { all: [], posts: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FETCH_TEST:
    return { ...state, test: action.payload.data };

  case FETCH_TESTS:
    return { ...state, all: action.payload.data }

  default:
    return state;
  }
}