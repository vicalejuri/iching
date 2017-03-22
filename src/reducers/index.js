import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';
import { IchingLoaded as interpretation } from './ichingloader';

import { combineReducers, compose } from 'redux';

export default combineReducers({
  kuas,
  hexagram,
  interpretation
});
