import { combineReducers, compose } from 'redux';

import { hexagramSet as hexagram} from './play';

import { detailsHexagram } from './details'

export default combineReducers({
  play_hexagram:     hexagram,
  details_hexagram:  detailsHexagram,
});
