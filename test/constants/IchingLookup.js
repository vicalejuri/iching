import { getIchingBook , Trigrams,
         getHexagram, getHexagramNumberByKuas } from "src/constants/IchingLookup";
import "src/assets/json/book";
import { getHexagramNumberByName } from "../../src/constants/IchingLookup";

// Fu hexagram (return - the turning point)
const kuasMock = [{value: 8, name: 'young-yang', yin: 0}, 
                  {value: 6, name: 'old-yin', yin: 1}, 
                  {value: 7, name: 'young-yin', yin: 1}, 
                  {value: 7, name: 'young-yin', yin: 1}, 
                  {value: 6, name: 'old-yin', yin: 1}, 
                  {value: 7, name: 'young-yin', yin: 1}]

describe("IChing Lookup", () => {
    it("should have window.Book loaded", () => {
        expect(window.Book).toBeDefined();
        expect(window.Book.length).toBe(64);
    });
    it("getIchingBook should return window.Book", () => {
        expect(getIchingBook()).toBe(window.Book);
    });
    it("should define Trigrams", () => {
        expect(Trigrams).toBeDefined();
        expect(Trigrams.length).toBe(8);
    })
    it("getHexagramNumberByKuas by simple Kuas array", () => {
        const hex_num = getHexagramNumberByKuas( kuasMock.map( (k) => k.yin) );

        expect(hex_num).toBe(24);
    })
    it("getHexagramNumberByKuas by complex Kuas array", () => {
        const hex_num = getHexagramNumberByKuas( kuasMock )

        expect(hex_num).toBe(24);
    })
    it("getHexagramNumberByName should be resilient", () => {
        const hexagram = getHexagramNumberByName('Chien');
        expect(hexagram).toBe(1)

        let hex2 = getHexagramNumberByName('XXX');
        expect(hex2).toBe(-1);
    });
    it("getHexagram by name", () => {
        const hexagram = getHexagram('Chien');
        expect(hexagram.name).toBe('Chien')
    });
    it("getHexagram by number", () => {
        const hexagram = getHexagram(1);
        expect(hexagram.name).toBe('Chien');
    })
    it('getHexagram by kuas', () => {
        const hexagram = getHexagram(kuasMock);
        expect(hexagram.number).toBe(24);
        expect(hexagram.name).toBe('Fu');
    })
});