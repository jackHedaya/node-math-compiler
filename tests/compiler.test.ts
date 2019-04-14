import Compiler from "../src/compiler";
import { CharacterType } from "../src/compiler";

var c = new Compiler();

describe("Compiler", () => {
  test("should throw with invalid start to equation", () => {
    expect(() => c.compile("@#@nd")).toThrow();
  });

  test("should not throw with normal start to equation", () => {
    expect.assertions(3);

    expect(() => c.compile("2x + 3 = 3")).not.toThrow();
    expect(() => c.compile("xy + 2 = 1")).not.toThrow();
    expect(() => c.compile("(3x + 4) = 3")).not.toThrow();
  });
});

describe("Compiler#precompile", () => {
  test("should crash on invalid equation", () => {
    expect(() => c["precompile"]("(( x + 2) = 3")).toThrow();
  });

  test("should not crash on valid equation", () => {
    expect(() => c["precompile"]("(3x) - 4 = (2/3+1)")).not.toThrow();
  });

  test("should not crash on equation that contains no parenthesis", () => {
    expect(() => c["precompile"]("2x + 4 = 6")).not.toThrow();
  });

  test("should crash on equation that contains only '('", () => {
    expect(() => c["precompile"]("(X + 3 = 0")).toThrow()
  });
  
  test("should crash on equation that contains only ')'", () => {
    expect(() => c["precompile"](")3 + 4 = 3X")).toThrow()
  });

  test("should add 0 to equation that starts with '-'", () => {
    expect(c["precompile"]("-24x = 5")).toBe("0-24x = 5");
  });
});

describe("Compiler#characterToType", () => {
  test("should return the correct type", () => {
    expect.assertions(4);

    expect(c.characterToType("+")).toBe(CharacterType.OPERATOR);
    expect(c.characterToType("2")).toBe(CharacterType.EXPRESSION);
    expect(c.characterToType("(")).toBe(CharacterType.EXPRESSION);
    expect(c.characterToType("x")).toBe(CharacterType.EXPRESSION);
  });
});