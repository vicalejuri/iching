import times from 'lodash/times';
import isNumber from 'lodash/isNumber';

import {
  PLAY_GENERATE_KUA, PLAY_CLEAR_KUAS, 
  PLAY_SET_HEXAGRAM, PLAY_CLEAR_HEXAGRAM
} from '../constants/ActionTypes';

import * as IchingTable from '../constants/IchingLookup';

function throwCoin() {
  return (Math.random() >= 0.5);
}

function kuaName(sum) {
  switch (sum) {
    case 9:
      return 'old-yang'; // yang change to yin
    case 8:
      return 'young-yang';
    case 7:
      return 'young-yin';
    case 6:
      return 'old-yin'; // yin change to yang
    default:
      return 'shit';
  }
}

/* Simplify moving lines */
function simplifyKua(sum) {
  return (sum === 9 && 8)
    || (sum === 6 ? 7 : sum)
}

/**
 * Generate a single kua.  3 coins method.
 *
 * {value: 8 , name: 'young-yin', yin: 1}
 */
export function generateKua() {

  // Throw 3 coins, head = 3, tails = 2
  const coins = times(3, throwCoin);
  const coinsValue = coins.map(coin => (coin ? 3 : 2));

  /* Iching Coin Method
  * 9 = 3 heads = Old Yang
  * 8 = 2 heads = Young Yang
  * 7 = 2 tails = Young Yin
  * 6 = 3 tails = Old Yin
  */
  const sum = coinsValue.reduce((a, b) => (a + b));
  let name = kuaName(sum);

  /* Simplify moving lines */
  // yang => 0 => ---
  // yin  => 1 => - -
  let simpleKua = simplifyKua(sum)
  let yin = (simpleKua === 7 ? 1 : 0)

  return { value: sum, name, yin }
}


// Single Line KUA Reducer
export function kuaCreated(state = [], action) {
  switch (action.type) {
    case PLAY_GENERATE_KUA:
      return [...state, generateKua()];
    case PLAY_CLEAR_KUAS:
      return [];
    default:
      return state;
  }
}


// Fetch the Hexagram interpretation
export function hexagramSet(state = -1, action ) {
  switch (action.type) {
    case PLAY_SET_HEXAGRAM:
      return (isNumber(action.payload) ? action.payload
                                       : IchingTable.getHexagramNumberByKuas(action.payload));
    case PLAY_CLEAR_HEXAGRAM:
      return -1;
    default:
      return state;
  }
}
