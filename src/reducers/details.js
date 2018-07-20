import {
  DETAILS_SET_HEXAGRAM,
} from '../constants/ActionTypes';

/**
 * Simple hexagram number change (a number)
 */
export function detailsHexagram( state = -1, action) {
    switch (action.type) {
      case DETAILS_SET_HEXAGRAM:
        return action.payload;
      default:
        return state;
    }
}