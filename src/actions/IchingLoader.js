import { ICHING_INTERPRETATION_LOAD, ICHING_INTERPRETATION_LOADED } from '../constants/ActionTypes';

// fetch JSON file using Browser Fetch
export function fetchIchingJSON( json_uri ) {
  return (dispatch, getState) => {
    dispatch( {
      type: ICHING_INTERPRETATION_LOAD,
      payload: json_uri,
    })

    return fetch( json_uri ).then( (json_data) => {
      if ( json_data.status !== 200 ) { throw `fetch failed -> ${json_uri} : ${json_data.status}` }
      dispatch( {
        type: ICHING_INTERPRETATION_LOADED,
        payload: json_data,
      })
    })
  };
}
