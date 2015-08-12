import generateKua from 'src/reducers/hexagram';
import * as _ from 'lodash';

describe("Hexagram", () => {
  it("should generate a single valid Kua line", function(){
    let kua = generateKua();

    expect(kua).toBeGreaterThan(5);
    expect(kua).toBeLessThan(10);
  });
});
