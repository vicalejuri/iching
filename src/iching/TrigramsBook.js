/**
 * The Book of Changes. and all trigrams references.
 * 
 */

import { findIndex , isArray, isNumber, isString  } from 'lodash'
import { is } from "src/constants/utils";


/**
 * Holds all trigrams information , icons and etc.
 * 
 */
export class TrigramsTable {

    /**
     * Get index of trigram by name
     * @param {String} triName Trigram name 
     */
    indexByName( triName ) {
        return findIndex( TrigramsTable.OBJECTS, tri => is(tri.name).equal(triName) )
    }
    /**
     * Get index of trigram by kuas
     * @param {[0,1,1]} kuas 
     */
    indexByKuas( kuas ) {
        return findIndex( TrigramsTable.OBJECTS, tri => is(tri.trigrams).equal(kuas) )  
    }

    /**
     * Get Trigram Object by its name
     * @param {String} triName      
     * @returns {String} { trigrams: [0,0,0],
                            image: '☁️',
                            image_name: 'cloud',
                            name: 'chien',
                            structure: 'Sense',
                            motivation: 'Creative',
                            body: 'head',
                            animal: '🐴',
                            animal_name: 'horse',
                            wilhelm: 'Heaven'}
     */
    get( tri ) {
        let hexNumber = 0
        if ( isArray(tri) ) {
            console.assert( tri.length == 3)
            hexNumber = this.indexByKuas( tri )
        } else if ( isNumber(tri) ) {
            hexNumber = tri;
        } else if ( isString(tri) ) {
            hexNumber = this.indexByName( tri )
        } else {
            console.error(`TrigramsTable.get: Invalid argument type ${tri}`)
        }
        return TrigramsTable.OBJECTS[ hexNumber ]
    }
}


/**
 * Plain text description of each kua
 */
TrigramsTable.KUAS = ["chien","tui","li","chen","sun","kan","ken","kun"]
TrigramsTable.OBJECTS = [
    { trigrams: [0,0,0],
        image: '☁️',
        image_name: 'cloud',
        name: 'chien',
        structure: 'Sense',
        motivation: 'Creative',
        body: 'head',
        animal: '🐴',
        animal_name: 'horse',
        wilhelm: 'Heaven'},
    { trigrams: [0,0,1],
        image: '💦',
        image_name: 'sweat_drops',
        structure: 'Feel',
        motivation: 'Serene',
        name: 'tui',
        body: 'mouth',
        animal: '🐐',
        animal_name: 'goat',
        wilhelm: 'Lake'},
    { trigrams: [0,1,0],
        image: '🔥',
        image_name: 'fire',
        structure: 'Think',
        motivation: 'Attaching',
        name: 'li',
        body: 'eye',
        animal: '🐦',
        animal_name: 'bird',
        wilhelm: 'Flame'},
    { trigrams: [0,1,1],
        image: '⚡',
        image_name: 'thunder',
        name: 'chen',
        structure: 'Spirit',
        motivation: 'Exciting',
        body: 'foot',
        animal: '🐉',
        animal_name: 'dragon',
        wilhelm: 'Thunder'},
    { trigrams: [1,0,0],
        image: '🍃',
        image_name: 'leaves',
        structure: 'Sense',
        motivation: 'Soft&Penetrating',
        name: 'sun',
        body: 'thigh',
        animal: '🐓',
        animal_name: 'rooster',
        wilhelm: 'Wind'},
    { trigrams: [1,0,1],
        image: '🌊️',
        image_name: 'ocean',
        structure: 'Soul',
        motivation: 'Danger&Abyss',
        name: 'kan',
        body: 'ear',
        animal: '🐖',
        animal_name: 'pig2',
        wilhelm: 'Water'},
    { trigrams: [1,1,0],
        image: '🗻',
        image_name: 'mount_fuji',
        name: 'ken',
        structure: 'Body',
        motivation: 'Keeping still',
        body: 'hand',
        animal: '🐕',
        animal_name: 'dog2',
        wilhelm: 'Mountain'},
    { trigrams: [1,1,1],
        image: '🌍',
        image_name: ':earth_africa',
        structure: 'Will',
        motivation: 'Recepetive',
        name: 'kun',
        body: 'belly',
        animal: '🐄',
        animal_name: ':cow2',
        wilhelm: 'Earth'},
]


/**
 * This order is know as King Wen sequence.
 *  The lowest numbers corresponds to resonants trigrams.
 *      Either by additive forces or by direct opposites
 * 
 *  example:
 *      chien + chien = 1
 *      kun   + kun   = 2
 *      kan   + chen  = 3
 *      ken   + kan   = 4
 *      kan   + chien = 5
 *      chien + kan   = 6
 *      kun   + kan   = 7
 *           ...
 *     sun    + tui   = 61
 *     chien  + ken   = 62
 *      kan   + li    = 63
 *      li    + kan   = 64
 *
 * These numbers corresponds to the interpretation X.
 *
 *  Check iching.json, there you can find the interpretation for every number
 *
 * Rows are lower trigrams
 * Columns are upper trigrams
 */
TrigramsTable.LOOKUP_TABLE = {
    //      chien,  tui,   li,   chen,   sun,     kan,    ken,     kun 
    'chien':  [1,    43,   14,     34,     9,       5,     26,     11],
    'tui':    [10,   58,   38,     54,     61,     60,     41,     19],
    'li':     [13,   49,   30,     55,     37,     63,     22,     36],
    'chen':   [25,   17,   21,     51,     42,      3,     27,     24],
    'sun':    [44,   28,   50,     32,     57,     48,     18,     46],
    'kan':    [6,    47,   64,     40,     59,     29,      4,      7],
    'ken':    [33,   31,   56,     62,     53,     39,     52,     15],
    'kun':    [12,   45,   35,     16,     20,      8,     23,      2],
}

// Export default singleton
export default (new TrigramsTable());

/*
export class IChingBook {
    constructor(){
        this.chapters = []
        this.trigrams = new TrigramsTable()
    }
}

export default let IChingBook = new IChingBook()

/*
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
*/