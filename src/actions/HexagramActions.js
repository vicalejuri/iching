import times from 'lodash/times';

import { HEXAGRAM_GENERATE_KUA, HEXAGRAM_GENERATED, HEXAGRAM_CLEAR,
         HEXAGRAM_GENERATE_TRIGRAM } from '../constants/ActionTypes';

// Generate a single line
export function generateKua() {
  return {
    type: HEXAGRAM_GENERATE_KUA
  }
}

export function generatedHexagram( kuas ) {
  return {
    type: HEXAGRAM_GENERATED,
    payload: kuas,
  };
}

export function clearHexagram() {
  return {
    type: HEXAGRAM_CLEAR,
  };
}


// 6 lines
export function generateHexagram() {
  return (dispatch, getState) => {
    
    // Throw 6 coins
    const kua_promises = times(6, () => {
      dispatch(generateKua())
      return Promise.resolve();
    })

    return Promise.all( kua_promises )
                  .then( () => {
                    const kuas  = getState().kuas;
                    dispatch(generatedHexagram(kuas));
                  })
  };
}

// 3 lines
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
