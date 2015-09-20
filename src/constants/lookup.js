/*
 * King Wen Lookup Table.
 *
 * Given two trigrams, get the iching number X
 * THen read the interpretation numbered X.
 */

import * as _ from 'lodash';
import ICHING from '!json!constants/iching.json';

// yang => 0 => ---
// yin  => 1 => - -

// TRIGRAMS: Always bottom to UP
export const Trigrams = [
     // chien , tui , li, chen, sun, kan, ken, kun
    { trigrams: [0,0,0], image: 'Heaven/sky', name: 'chien', body: 'head',  animal: 'horse',          wilhelm: 'The Creative, Force'},
    { trigrams: [0,0,1], image: 'Lake',       name: 'tui',   body: 'mouth', animal: ['sheep','goat'], wilhelm: 'The Joyous, Open'},
    { trigrams: [0,1,0], image: 'Fire',       name: 'li',    body: 'eye',   animal: 'pheasant',       wilhelm: 'The Clinging, Radiance'},
    { trigrams: [0,1,1], image: 'Thunder',    name: 'chen',  body: 'foot',  animal: 'dragon',         wilhelm: 'The Arousingm, Shake'},
    { trigrams: [1,0,0], image: 'Wind',       name: 'sun',   body: 'thigh', animal: 'fowl',           wilhelm: 'The Gentle, Ground'},
    { trigrams: [1,0,1], image: 'Water',      name: 'kan',   body: 'ear',   animal: 'pig',            wilhelm: 'The Abysmal, Gorge'},
    { trigrams: [1,1,0], image: 'Mountain',   name: 'ken',   body: 'hand',  animal: ['wolf','dog'],   wilhelm: 'Keeping Still, Bound'},
    { trigrams: [1,1,1], image: 'Earth',      name: 'kun',   body: 'belly', animal: 'cow',            wilhelm: 'The Receptive, Field'},
];

//  This order is called king wen sequence
//
// These numbers corresponds to the interpretation X.
// Check iching.json, there you can find the interpreatation for every number
//
// Vertical rows are lower trigrams
// Horizontal lines are upper trigrams
export const Lookup =  {
    'chien':  [1,  43, 14, 34, 9,   5, 26, 11],
    'tui':    [10, 58, 38, 54, 61, 60, 41, 19],
    'li':     [13, 49, 30, 55, 37, 63, 22, 36],
    'chen':   [25, 17, 21, 51, 42,  3, 27, 24],
    'sun':    [44, 28, 50, 32, 57, 48, 18, 46],
    'kan':    [6,  47, 64, 40, 59, 29,  4,  7],
    'ken':    [33, 31, 56, 62, 53, 39, 52, 15],
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
  let below = _.pluck( kuas.slice(0,3) , 'yin_yang' );
  let above = _.pluck( kuas.slice(3)   , 'yin_yang' );

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
 */
export function getHexagram( hex ) {

  let hexNumber = 1;
  if ( _.isArray(hex) ) {
    hexNumber = getHexagramNumberByKuas( hex );
  } else if ( _.isNumber(hex) ) {
    hexNumber = hex;
  } else {
    console.error('getHexagram', 'Argument ',hex,' is not of valid type (Number or Array of Kuas)');
    return {};
  }

  // And finally the interpretation
  let hexInterpretation = _.find( ICHING, {'number': hexNumber});

  console.debug( 'Before --> ',hexInterpretation.trigrams );

  hexInterpretation.trigrams.below = getTrigramByName( hexInterpretation.trigrams.below );
  hexInterpretation.trigrams.above = getTrigramByName( hexInterpretation.trigrams.above );

  console.debug( 'After --> ',hexInterpretation.trigrams );

  return hexInterpretation;
}



/*
 * Return a list (in order) of all hexagrams
 */
export function getAllHexagrams( ) {
  let sortedSeq = _.chain( Lookup ).values().flatten().sortBy().value();

  return _.map( sortedSeq , getHexagram );
}
