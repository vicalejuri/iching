/*
 * King Wen Lookup Table.
 *
 * Given two trigrams, get the iching number X
 * THen read the interpretation numbered X.
 */

import * as _ from 'lodash';

function getIching() {
  return window.store.getState().iching
}

// yang => 0 => ---
// yin  => 1 => - -

// TRIGRAMS: Always bottom to UP
export const Trigrams = [
    // chien , tui , li, chen, sun, kan, ken, kun
    { trigrams: [0,0,0],
        image: '⛅',
        image_name: 'heaven',
        name: 'chien',
        body: 'head',
        animal: '🐴',
        animal_name: 'horse',
        wilhelm: 'Heaven'},
    { trigrams: [0,0,1],
        image: '💦',
        image_name: 'lake',
        name: 'tui',
        body: 'mouth',
        animal: '🐐',
        animal_name: 'goat',
        wilhelm: 'Lake'},
    { trigrams: [0,1,0],
        image: '🔥',
        image_name: 'fire',
        name: 'li',
        body: 'eye',
        animal: '🐦',
        animal_name: 'pheasant',
        wilhelm: 'Flame'},
    { trigrams: [0,1,1],
        image: '⚡',
        image_name: 'thunder',
        name: 'chên',
        body: 'foot',
        animal: '🐉',
        animal_name: 'dragon',
        wilhelm: 'Thunder'},
    { trigrams: [1,0,0],
        image: '🎐',
        image_name: 'wind',
        name: 'sun',
        body: 'thigh',
        animal: '🐓',
        animal_name: 'fowl',
        wilhelm: 'Wind'},
    { trigrams: [1,0,1],
        image: '🌊',
        image_name: 'water',
        name: 'kan',
        body: 'ear',
        animal: '🐖',
        animal_name: 'pig',
        wilhelm: 'Water'},
    { trigrams: [1,1,0],
        image: '🗻',
        image_name: 'mountain',
        name: 'kên',
        body: 'hand',
        animal: '🐕',
        animal_name: 'dog',
        wilhelm: 'Mountain'},
    { trigrams: [1,1,1],
        image: '🌍',
        image_name: 'earth',
        name: 'kun',
        body: 'belly',
        animal: '🐄',
        animal_name: 'cow',
        wilhelm: 'Earth'},
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
    chien:  [1,  43, 14, 34, 9,   5, 26, 11],
    tui:    [10, 58, 38, 54, 61, 60, 41, 19],
    li:     [13, 49, 30, 55, 37, 63, 22, 36],
    chên:   [25, 17, 21, 51, 42,  3, 27, 24],
    sun:    [44, 28, 50, 32, 57, 48, 18, 46],
    kan:    [6,  47, 64, 40, 59, 29,  4,  7],
    kên:    [33, 31, 56, 62, 53, 39, 52, 15],
    kun:    [12, 45, 35, 16, 20,  8, 23,  2],
};


// Get a trigram full representation from a array of 3 kuas
export function getTrigram( trigram_bitfield ) {
  return _.find( Trigrams,  tri => _.isEqual( tri.trigrams, trigram_bitfield) );
}

// Get a trigram full representation from its name
export function getTrigramByName( trigram_name ) {
  return _.find( Trigrams, tri => _.isEqual( tri.name, trigram_name ) );
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
    let kuas = _.map( hex, k => k.yin )
    hexNumber = getHexagramNumberByKuas( kuas )
    console.trace()
    console.log(kuas, hexNumber);
  } else if ( _.isNumber(hex) ) {
    hexNumber = hex;
  } else if ( _.isString(hex) ) {
    hexNumber = _.find( getIching(),  {name: hex} ).number;
  } else {
    console.error('getHexagram', `Argument ${hex} is not of valid type
            (Number,Name or Array of Kuas)`);
    return undefined;
  }

  // And finally the interpretation
  let hexInterpretation = _.extend({}, _.find( getIching(), {number: hexNumber}) );

  return hexInterpretation;
}



/*
 * Return a list (in order) of all hexagrams
 * ** Deprecated , use state.iching **
 */
export function getAllHexagrams( ) {
  if ( getIching().length === 0) return []

  let sortedSeq = _.chain( Lookup )
                    .values()
                    .flatten().sortBy()
                    .value();
  return _.map( sortedSeq , getHexagram );
}
