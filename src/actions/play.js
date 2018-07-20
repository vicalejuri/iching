import times from 'lodash/times';

import * as IchingLookup from '../constants/IchingLookup';
import { PLAY_SET_HEXAGRAM, PLAY_CLEAR_HEXAGRAM } from '../constants/ActionTypes';

// Set Play Hexagram 
export function setPlayHexagram( kuas_or_hex_number ) {
  return {
    type: PLAY_SET_HEXAGRAM,
    payload: kuas_or_hex_number,
  };
}


export function clearHexagram() {
  return { type: PLAY_CLEAR_HEXAGRAM};
}

/** Throw dices and create a hexagram */
export function generateHexagram() {
  return (dispatch, getState) => {
    
    // Throw 6 coins
    const kuas = times(6, IchingLookup.generateKua );
    return dispatch( setPlayHexagram(kuas) );
  };
}