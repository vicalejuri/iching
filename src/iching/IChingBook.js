import { toPairs, fromPairs, isString, isArray, isNumber } from 'lodash'

import { is , filterHTTP } from "src/constants/utils";

import TrigramsBook from './TrigramsBook'

/**
 * Iching book contains the interpretation, via a external json file.
 * and methods to:
 *  get Hexagram by its 6 single kuas (only yin|yang),
 * 
 * todo:
 *  Add support for (young|old) interpretations 
 *  Add the moving lines. 
 */
export class IChingBook {
    constructor(){
        this.loaded   = false
    }

    loadJSON( url_or_data ) {
        if( isString(url_or_data) ) return this.fetchJSON( url_or_data )
        else                        return this.provideJSON( url_or_data );
    }

    /**
     * URL of IChingBook , json format.
     * JSON Should match the hexagram number with TrigramsBook.LOOKUP_TABLE
     * 
     * @param {URI} url 
     */
    fetchJSON( url ) {
        return fetch( url )
                .then( filterHTTP(200,300) )
                .then( _ => _.json() )
                .then( this.provideJSON.bind(this) )
    }

    provideJSON( book_json_data ) {
        this.loaded = true
        IChingBook.chapters = book_json_data
    }

    /**
     * Will get you an Hexagram Number from 6 kuas
     * 
     * This is equivalent to using the Book from the kuas (yin, yang, yang, yin, yang, yin)
     *   
     * @param {Array} kuas
     * @returns {Object or Undefined} 
     */
    indexByKuas( kuas ) {
        console.assert(kuas.length == 6, "Incomplete Kuas number ");

        let below = kuas.slice(0,3);
        let above = kuas.slice(3);
      
        let belowTrigram =  TrigramsBook.get( below );
        let aboveTrigram =  TrigramsBook.get( above );

        let aboveIndex = TrigramsBook.KUAS.indexOf( aboveTrigram.name )
        let hexNumber = TrigramsBook.LOOKUP_TABLE[belowTrigram.name][aboveIndex];
      
        return hexNumber
    }

    /**
     * Get the Interpretation from the book
     * 
     * @param {Number|String|Array} n 
     * @returns {Object or Undefined} 

     */
    get( n ) {
        console.assert(this.loaded, "IChingBook should be loaded before using it.")

        let hexagram_number = 0
        if ( isArray(n) ) {
            hexagram_number = this.indexByKuas(n)
        } else if ( isString(n) ) {
            hexagram_number = this.indexByName(n)
        } else if ( isNumber(n) ) {
            hexagram_number = n;
        } else {
            console.error(`IChingBook.get: Invalid argument type ${n}`)
        }

        return IChingBook.chapters[hexagram_number]
    }


}

IChingBook.trigrams = TrigramsBook
IChingBook.chapters = []

// Export default singleton
export default (new IChingBook);