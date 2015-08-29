import { HEXAGRAM_GENERATE_KUA, HEXAGRAM_GENERATED,
         HEXAGRAM_GENERATE_TRIGRAM } from '../constants/ActionTypes';


export function generatedHexagram( kuas ) {
  return {
    type: HEXAGRAM_GENERATED,
    //payload: kuas,
  };
}


export function generateKua() {
  return (dispatch, getState) => {
    let hexx = getState().kuas;

    // hexagram complete with 6!
    if (hexx.length <= 5) {
      dispatch({type: HEXAGRAM_GENERATE_KUA});
    } else {
      dispatch(generatedHexagram(hexx));
    }

  };
}

export function generateHexgram() {
  return (dispatch, getState) => {
    // Throw 6 coins
    for (let i of [1,2,3,4,5,6]) {
      dispatch(generateKua());
    }

    // The last one emit 'HEXAGRAM_GENERATED'
    dispatch(generateKua());
  };
}

export function generateTrigram() {
  return (dispatch, getState) => {
    // Throw 3 coins
    for (let i of [1,2,3]) {
      dispatch(generateKua());
    }

    dispatch({type: HEXAGRAM_GENERATE_TRIGRAM});
  };
}
