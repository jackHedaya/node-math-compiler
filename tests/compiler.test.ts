import Compiler from "../src/compiler";
import { CharacterType } from "../src/compiler";

var c = new Compiler();

describe("Compiler", () => {
  test("should throw with start to equation", () => {
    expect(() => c.compile("@#@nd")).toThrow();
  });

  test("should not throw with normal start to equation", () => {
    expect.assertions(3);

    expect(() => c.compile("2x + 3 = 3")).not.toThrow();
    expect(() => c.compile("xy + 2 = 1")).not.toThrow();
    expect(() => c.compile("(3x + 4) = 3")).not.toThrow();
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