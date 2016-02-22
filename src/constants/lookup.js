/*
 * King Wen Lookup Table.
 *
 * Given two trigrams, get the iching number X
 * THen read the interpretation numbered X.
 */

import * as _ from 'lodash';
import ICHING from '!json!constants/iching_deoxy.json';

// yang => 0 => ---
// yin  => 1 => - -

// TRIGRAMS: Always bottom to UP
export const Trigrams = [
     // chien , tui , li, chen, sun, kan, ken, kun
    { trigrams: [0,0,0], image: 'Heaven/sky', name: 'chien', body: 'head',  animal: 'horse',          wilhelm: 'The Creative, Heaven'},
    { trigrams: [0,0,1], image: 'Lake',       name: 'tui',   body: 'mouth', animal: ['sheep','goat'], wilhelm: 'The Joyous, Lake'},
    { trigrams: [0,1,0], image: 'Fire',       name: 'li',    body: 'eye',   animal: 'pheasant',       wilhelm: 'The Clinging, Flame'},
    { trigrams: [0,1,1], image: 'Thunder',    name: 'chên',  body: 'foot',  animal: 'dragon',         wilhelm: 'The Arousing, Thunder'},
    { trigrams: [1,0,0], image: 'Wind',       name: 'sun',   body: 'thigh', animal: 'fowl',           wilhelm: 'The Gentle, Wind'},
    { trigrams: [1,0,1], image: 'Water',      name: 'kan',   body: 'ear',   animal: 'pig',            wilhelm: 'The Abysmal, Water'},
    { trigrams: [1,1,0], image: 'Mountain',   name: 'kên',   body: 'hand',  animal: ['wolf','dog'],   wilhelm: 'Keeping Still, Mountain'},
    { trigrams: [1,1,1], image: 'Earth',      name: 'kun',   body: 'belly', animal: 'cow',            wilhelm: 'The Receptive, Earth'},
];

//  This order is called king wen sequence
//
// These numbers corresponds to the interpretation X.
// Check iching.json, there you can find the interpreatation for every number
//
// Vertical rows are lower trigrams
// Horizontal lines are upper trigrams
export const Lookup =  {
          // chien,tui,li,chen,sun,san,kan,ken,kun
    'chien':  [1,  43, 14, 34, 9,   5, 26, 11],
    'tui':    [10, 58, 38, 54, 61, 60, 41, 19],
    'li':     [13, 49, 30, 55, 37, 63, 22, 36],
    'chên':   [25, 17, 21, 51, 42,  3, 27, 24],
    'sun':    [44, 28, 50, 32, 57, 48, 18, 46],
    'kan':    [6,  47, 64, 40, 59, 29,  4,  7],
    'kên':    [33, 31, 56, 62, 53, 39, 52, 15],
    'kun':    [12, 45, 35, 16, 20,  8, 23,  2],
};


// Get a trigram full representation from a array of 3 kuas
export function getTrigram( trigram_bitfield ) {
  return _.find( Trigrams,  (tri) => {
    return _.eq( tri.trigrams, trigram_bitfield);
  } );
}

// Get a trigram full representation from its name
export function getTrigramByName( trigram_name ) {
  return _.find( Trigrams, (tri) => {
    return _.eq( tri.name, trigram_name );
  } );
}


export function getHexagramNumberByKuas( kuas ) {
  let below = kuas.slice(0,3);
  let above = kuas.slice(3);

  let belowTrigram =  getTrigram( below );
  let aboveTrigram =  getTrigram( above );

  // Get the index of above trigram
  let aboveIndex = _.keys( Lookup ).indexOf( aboveTrigram.name );

  // Now get the desired hex number
  let hexNumber = Lookup[belowTrigram.name][aboveIndex];

  return hexNumber;
}

/*
 * Get a full hexagram.
 *
 * hex = array of kuas
 * or the hexagram number
 * or hexagram name
 */
export function getHexagram( hex ) {

  let hexNumber = 1;
  if ( _.isArray(hex) ) {
    hexNumber = getHexagramNumberByKuas( hex );
  } else if ( _.isNumber(hex) ) {
    hexNumber = hex;
  } else if ( _.isString(hex) ) {
    hexNumber = _.find( ICHING,  {'name': hex} ).number;
  } else {
    console.error('getHexagram', 'Argument ',hex,' is not of valid type (Number,Name or Array of Kuas)');
    return {};
  }

  // And finally the interpretation
  let hexInterpretation = _.extend({}, _.find( ICHING, {'number': hexNumber}) );

  /* Aggregate full trigram info plz
  let below = _.extend( {} , getTrigramByName( hexInterpretation.trigrams.below ) );
  let above = _.extend( {} , getTrigramByName( hexInterpretation.trigrams.above ) );
  hexInterpretation.trigrams.below = below;
  hexInterpretation.trigrams.above = above;

  if (hexInterpretation.trigrams.below === undefined ||
      hexInterpretation.trigrams.below === undefined) {
    console.error( hexInterpretation , ' failed!');
    console.log( hex );
    console.log( hexNumber );
    debugger;
  }
  */

  return hexInterpretation;
}



/*
 * Return a list (in order) of all hexagrams
 */
export function getAllHexagrams( ) {
  let sortedSeq = _.chain( Lookup ).values().flatten().sortBy().value();

  return _.map( sortedSeq , getHexagram );
}
