import { combineReducers, compose } from 'redux';

import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';


export default combineReducers({
  kuas,
  hexagram
});
