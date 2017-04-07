import { combineReducers, compose } from 'redux';

import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';
import { IchingLoaded as iching } from './ichingloader';


export default combineReducers({
  kuas,
  hexagram,
  iching
});
