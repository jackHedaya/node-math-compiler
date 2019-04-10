import Compiler from "../src/compiler";

const equation = "2x + 5 = 20";

describe("Compiler", () => {
  test("should fail with weird input", () => {
    var c = new Compiler();
    
    expect(c.compile("@#@nd")).toThrow();
  });
});