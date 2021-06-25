// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, ADD_FAVORITE, REMOVE_FAVORITE, REMOVE_USER } from '../actions/actions';

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
      return action.value;
    case ADD_FAVORITE:
      console.log("STATE------",state, "ACTION -------",action);
      return {
       ...state,
        FavoriteMovies: [...action.value]
      };
    case REMOVE_FAVORITE:
       return {
         ...state,
        FavoriteMovies: state.FavoriteMovies.filter(movie => movie !== action.value)
      };
    case REMOVE_USER:
      return null
    default:
      return state;
  }
}

// function userFavorite(state = {}, action) {
//   switch (action.type) {
//     case ADD_FAVORITE: {
//       return action.payload
//     };
//     case REMOVE_FAVORITE:
//       return {
//         ...state,
//         FavoriteMovies: state.FavoriteMovies.filter(movie => movie !== action.value)
//       }
//     default:
//       return state;
//   }
// }

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userState
});

export default moviesApp;