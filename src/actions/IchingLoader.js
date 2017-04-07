import { ICHING_INTERPRETATION_LOAD, ICHING_INTERPRETATION_LOADED } from '../constants/ActionTypes';

// fetch JSON file using Browser Fetch
export default function fetchIchingJSON( json_uri ) {
  return (dispatch, getState) => fetch( json_uri ).then( (response) => {
      if ( response.status !== 200 ) { throw `fetch failed -> ${json_uri} : ${response.status}` }
      response.json().then( (json_data) => {
        dispatch( {
          type: ICHING_INTERPRETATION_LOADED,
          payload: json_data,
        })
      })
    });
}
