import isNumber from 'lodash/isNumber';

import * as IchingLookup from '../constants/IchingLookup';

import {
  PLAY_SET_HEXAGRAM, PLAY_CLEAR_HEXAGRAM
} from '../constants/ActionTypes';

// Fetch the Hexagram interpretation
export function hexagramSet(state = -1, action ) {
  switch (action.type) {
    case PLAY_SET_HEXAGRAM:
      return (isNumber(action.payload) ? action.payload
                                       : IchingLookup.getHexagramNumberByKuas(action.payload));
    case PLAY_CLEAR_HEXAGRAM:
      return -1;
    default:
      return state;
  }
}
