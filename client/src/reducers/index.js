import { combineReducers } from 'redux';
import TestsReducer from './reducer_tests';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  tests: TestsReducer,
  form: formReducer
});

export default rootReducer;