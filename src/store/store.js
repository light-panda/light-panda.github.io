import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as ajaxReducer } from 'react-redux-pull';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    ajax: ajaxReducer
  }),
  applyMiddleware(thunk)
);
