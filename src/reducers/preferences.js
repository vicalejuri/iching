import {
  PREFERENCES_SET
} from '../constants/ActionTypes';

// Set preferences key-value
export function preferences(state = {}, action ) {
  switch (action.type) {
    case PREFERENCES_SET:
      return Object.assign({[action.payload.name]: action.payload.value }, state)
    default:
      return state;
  }
}
