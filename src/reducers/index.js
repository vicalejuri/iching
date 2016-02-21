import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';

import { combineReducers, compose } from 'redux';

export default combineReducers({
  kuas,
  hexagram
});
