import { generateKua } from "src/reducers/hexagram.js";
import * as _ from "lodash";

describe("Hexagram", () => {
  it("should generate a single valid Kua line", function() {
    let kua = generateKua();

    expect(kua.value).toBeGreaterThan(5);
    expect(kua.value).toBeLessThan(10);
  });
  it("A hexagram should contain 6 kuas", () => {
    expect(true).toBe(true);
  });
});
