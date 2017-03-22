import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';
import { IchingLoaded as iching } from './ichingloader';

import { combineReducers, compose } from 'redux';

export default combineReducers({
  kuas,
  hexagram,
  iching
});
