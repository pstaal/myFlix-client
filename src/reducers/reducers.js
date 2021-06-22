// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userState(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userState: action.value
      };
    case ADD_FAVORITE:
      return {
        ...state,
        userState.favoriteMovies: [...state.userState.favoriteMovies, action.value]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        userState.favoriteMovies: state.userState.favoriteMovies.filter(movie => movie !== action.value)
      };
    case REMOVE_USER:
      return {
        ...state,
        userState: null
      }
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userState
});

export default moviesApp;