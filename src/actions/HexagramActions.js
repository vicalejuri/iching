import { HEXAGRAM_GENERATE_KUA, HEXAGRAM_GENERATED } from '../constants/ActionTypes';


export function generateHexagram( kuas ) {
  return {
    type: HEXAGRAM_GENERATED,
    payload: kuas,
  };
}


export function generateKua() {
  return (dispatch, getState) => {
    let hexx = getState().hexagram;

    // hexagram complete with 6!
    if (hexx.length === 5) {
      dispatch({type: HEXAGRAM_GENERATE_KUA});
      dispatch(generateHexagram(hexx));
    } else {
      dispatch({type: HEXAGRAM_GENERATE_KUA});
    }
  };
}
