import { HEXAGRAM_GENERATE_KUA, HEXAGRAM_GENERATED, HEXAGRAM_CLEAR,
         HEXAGRAM_GENERATE_TRIGRAM } from '../constants/ActionTypes';


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


// Generate a single line
export function generateKua() {
  return (dispatch, getState) => {
    let hexx = getState().kuas;

    // hexagram complete with 6!
    if ( !hexx || hexx.length <= 5) {
      dispatch({type: HEXAGRAM_GENERATE_KUA});
    } else if ( hexx && hexx.length >= 6) {
      dispatch(generatedHexagram(hexx));
    }

  };
}

// 6 lines
export function generateHexagram() {
  return (dispatch, getState) => {
    // Throw 6 coins
    for (let i = 0; i < 7; i += 1) {
      dispatch(generateKua());
    }
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
  };
}
