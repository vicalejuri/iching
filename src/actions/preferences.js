import { PREFERENCES_SET } from '../constants/ActionTypes';

// Set single preferences 
export function setPreference( name, value ) {
  return {
    type: PREFERENCES_SET,
    payload: { name, value }
  };
}