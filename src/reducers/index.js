import { combineReducers, compose } from 'redux';

import { kuaCreated as kuas ,
        hexagramSet as hexagram} from './play';

export default combineReducers({
  kuas:          kuas,
  play_hexagram: hexagram,
});
