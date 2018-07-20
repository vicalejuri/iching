import { combineReducers, compose } from 'redux';

import { kuaCreated as kuas ,
        hexagramSet as hexagram} from './play';

import { detailsHexagram } from './details'

export default combineReducers({
  kuas:              kuas,
  play_hexagram:     hexagram,
  details_hexagram:  detailsHexagram,
});
