import { ICHING_BOOK_LOADED } from '../constants/ActionTypes';

// IChing book
export function BookLoaded(state = false, action) {
  switch (action.type) {
    case ICHING_BOOK_LOADED:
      return true;
    default:
      return state;
  }
}
