import TrigramsBook , { TrigramsTable } from 'src/iching/TrigramsBook'
import IChingBook from 'src/iching/IChingBook'
import { toPairs } from 'lodash'

let ALL_TRIGRAMS = 8
let allHexagrams = ALL_TRIGRAMS * ALL_TRIGRAMS

import JSONBook from 'src/iching/iching_deoxy.json'

describe("iching", () => {

  describe("TrigramsTable", () => {
    it("Should be a valid Class", () => {
      expect(TrigramsTable).toBeDefined() 
    })
    it("Should contain Trigrams Descriptions", () => {
      expect(TrigramsTable.OBJECTS).toBeDefined()
    })
    it("Should contain Hexagram lookup table", () => {
      expect(TrigramsTable.LOOKUP_TABLE).toBeDefined()      
    })

    describe("Hexagram OBJECTS", () => {
      it("Should be an array", () => {
        expect(TrigramsTable.OBJECTS.length).toBeGreaterThan( 0 )        
      })

      it("Should contain all Trigrams(8)", () => {
        expect(TrigramsTable.OBJECTS.length).toBe( ALL_TRIGRAMS )
      })
    })

    describe("Hexagram LOOKUP_TABLE", () => {
      let lookup = toPairs( TrigramsTable.LOOKUP_TABLE )

      it("Should contain 8 rows", () => {
        expect(lookup.length).toBe(ALL_TRIGRAMS)
      })

      it("Should contain 8 NUMBERS for each row", () => {
        let eachrow = lookup.map( f => f[1] )
        let isvalid = eachrow.reduce( (p,n) => (n.length == ALL_TRIGRAMS))
        
        expect(isvalid).toBe(true)
        /*
        for(let i=0; i < ALL_TRIGRAMS; i++){
          expect(lookup[i][1].length).toBe( ALL_TRIGRAMS )        
        }
        */
      })
    })

  })

  describe("TrigramsBook", () => {
    it("Should be an singleton", () => {
      expect(TrigramsBook).toBeDefined()
    })
    it("get(NUMBER)", () => {
      let tri = TrigramsBook.get(0)
      expect(tri).toBeDefined()
    })
    it("get(NAME)", () => {
      let tri = TrigramsBook.get('ken')
      expect(tri).toBeDefined()
    })
    it("get(KUAS)", () => {
      let tri = TrigramsBook.get([0,0,0])
      expect(tri).toBeDefined()
    })
  })

  describe("IChingBook", () => {
    
    it("Should be an singleton", () => {
      expect(IChingBook).toBeDefined()
    })
    it("Should warn when using without book loaded", () => {
      spyOn( console, 'assert' )
      IChingBook.get(1)
      expect(console.assert).toHaveBeenCalled()
    })
    it("Should return undefined without book loaded", () => {
      expect(IChingBook.get(1)).toBeUndefined()
    })

    describe("loadJSON() - Load book data", () => {
      it("loadJSON( 'https://jsonplaceholder.typicode.com/posts/1') - URL retrieved by fetch ", (end) => {
        
        let dummy = jasmine.createSpy('catchDummy')
        let prom = IChingBook.loadJSON( 'https://jsonplaceholder.typicode.com/posts/1' )
        
        // Should not call dummy
        prom.catch( dummy ).then( _ => {
          expect( dummy ).not.toHaveBeenCalled()
          end()
        })
      })

      it("loadJSON( FAIL) => Graciously use of Promise.catch.", (end) => {
        
        let dummy = jasmine.createSpy('catchDummy')        
        let prom = IChingBook.loadJSON( 'http://google.com/public/json/iching_deoxy.json' )
        prom.catch( dummy ).then( () => {
          let first = IChingBook.get(0)
          expect(first).toBeUndefined()

          expect( dummy ).toHaveBeenCalled()
          end()
        })
      })

      it("loadJSON( [{a: 10, ...}, {a: 20}, ...] ) - Built-in passing a Array of Objects", () => {
        IChingBook.loadJSON( JSONBook )
        let first = IChingBook.get(0)
        expect(first).toBeDefined()
      })
    })

    describe("get(*) - Get Hexagram data ", () => {
      beforeAll( () => {
        IChingBook.loadJSON( JSONBook )        
      })

      it("get(int) - Get hexagram by number index (start at 0)", () => {
        let first = IChingBook.get(0)
        expect(first).toBeDefined()
      })
      it("get(String) - Get Hexagram by its name", () => {
        let hex = IChingBook.get("Chien")
        expect(hex).toBeDefined()   
      })
      it("get(Array) - Get Hexagram by a array of 6 kuas [1,1,1,0,0,0]", () => {
        let hex = IChingBook.get([0,0,0,0,0,0])
        expect(hex).toBeDefined()
      })
    })

  })

});