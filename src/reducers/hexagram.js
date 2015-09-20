import { HEXAGRAM_GENERATE_KUA, HEXAGRAM_GENERATED, HEXAGRAM_CLEAR } from '../constants/ActionTypes';
import * as _ from 'lodash';

import * as HexagramActions from '../actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';


/*
 * True = head
 * False = tails
 */
function throwCoin() {
  return (Math.random() >= 0.5);
}

/**
 * Generate a single kua.  3 coins method.
 *
 * {value: 8 , name: 'young-yin'}
 */
export function generateKua() {

  // Throw 3 coins
  const coins = _.times(3, throwCoin );

  const coinsValue = _.map( coins, coin => {
    if (coin) return 3;
    return 2;
  });

  /* Iching Coin Method
  * 9 = 3 heads = Old Yang
  * 8 = 2 heads = Young Yang
  * 7 = 2 tails = Young Yin
  * 6 = 3 tails = Old Yin
  */
  const kuaSum  = _.sum( coinsValue );
  const kuaName = (sum) => {
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
  }(kuaSum);

  const kuaYinOrYang =  () => {
    if (kuaName === 'old-yang' || kuaName === 'young-yang') return 0;
    return 1;
  }();

  return {value: kuaSum, name: kuaName, yin_yang: kuaYinOrYang};
}




// Single Line KUA Reducer
export default function kuaCreated(state = [], action) {
  switch (action.type) {
    case HEXAGRAM_GENERATE_KUA:
      return [...state , generateKua()];
    case HEXAGRAM_CLEAR:
      return [];
    default:
      return state;
  }
}

// From 6 given kuas, fetch the interpretation
export function hexagramCreated(state = {}, action) {
  switch (action.type) {
    case HEXAGRAM_GENERATED:
      console.log('HEXAGRAM_GENERATED');
      return IchingTable.getHexagram( window.store.getState().kuas );
    case HEXAGRAM_CLEAR:
      return {};
    default:
      return state;
  }
}
