import { combineReducers, compose } from 'redux';

import { preferences } from './preferences';
import { hexagramSet as hexagram} from './play';
import { detailsHexagram } from './details';
import { BookLoaded } from './book';

export default combineReducers({
  preferences:        preferences,
  play_hexagram:      hexagram,
  details_hexagrram:  detailsHexagram,
  book_loaded:        BookLoaded
});
