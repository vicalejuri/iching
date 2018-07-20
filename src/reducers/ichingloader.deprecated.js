import { ICHING_BOOK_LOAD, ICHING_BOOK_LOADED } from '../constants/ActionTypes';

import * as HexagramActions from '../actions/HexagramActions';
import * as IchingTable from '../constants/IchingLookup';

// IChing data
export function IchingLoaded(state = [], action) {
  switch (action.type) {
    case ICHING_BOOK_LOADED:
      return action.payload;
    default:
      return state;
  }
}
