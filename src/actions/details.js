import isString from 'lodash/isString';

import {
    DETAILS_SET_HEXAGRAM,
} from '../constants/ActionTypes';

import { getHexagramNumberByName } from '../constants/IchingLookup';
  
/**
 *  Detail hexagram action
 */
export function setDetailsHexagram( hexagram ) {
    return {
        type: DETAILS_SET_HEXAGRAM,
        payload: isString(hexagram) ? getHexagramNumberByName(hexagram) : Math.floor( hexagram )
    }
}