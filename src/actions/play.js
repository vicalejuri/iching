import times from 'lodash/times';

import { PLAY_GENERATE_KUA, PLAY_CLEAR_KUAS,
         PLAY_SET_HEXAGRAM, PLAY_CLEAR_HEXAGRAM } from '../constants/ActionTypes';

// Generate a single line
export function generateKua() {
  return {
    type: PLAY_GENERATE_KUA
  }
}

// Set Active Hexagram Data
export function setHexagram( kuas_or_hex_number ) {
  return {
    type: PLAY_SET_HEXAGRAM,
    payload: kuas_or_hex_number,
  };
}


export function clearHexagram() {
  return { type: PLAY_CLEAR_HEXAGRAM};
}

export function clearKuas(){
  return {type: PLAY_CLEAR_KUAS};
}


/** Throw dices and create a hexagram */
export function generateHexagram() {
  return (dispatch, getState) => {
    
    // Throw 6 coins
    const kua_promises = times(6, () => {
      dispatch(generateKua())
      return Promise.resolve();
    })

    
    return Promise.all( kua_promises )
                  .then( (x) => {
                    const { kuas }  = getState();
                    dispatch( setHexagram(kuas) );
                  })
  };
}

/* 3 lines
export function generateTrigram() {
  return (dispatch, getState) => {
    // Throw 3 coins
    for (let i = 0; i < 3; i += 1) {
      dispatch(generateKua());
    }

    dispatch({type: HEXAGRAM_GENERATE_TRIGRAM});
    return Promise.resolve();
  };
}
*/