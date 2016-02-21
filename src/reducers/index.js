import { kuaCreated as kuas ,
         hexagramCreated as hexagram} from './hexagram';

import { combineReducers, compose } from 'redux';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  kuas,
  hexagram,
  router: routerStateReducer
});
