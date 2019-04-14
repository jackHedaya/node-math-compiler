import Compiler from "../src/compiler";
import { CharacterType } from "../src/compiler";
import Token, { TokenType } from "../src/token";

var c: Compiler = new Compiler();

afterEach(() => {
  c = new Compiler();
});

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

describe("Compiler#compile", () => {
  test("should properly compile '2x + 3 = 4'", () => {
    const map = c.compile("2x + 3 = 4");

    expect(map).toEqual([
      new Token(TokenType.COMPILER_START, null),
      new Token(TokenType.EXPRESSION_START, "2"),
      new Token(TokenType.EXPRESSION_CONTINUE, "x"),
      new Token(TokenType.OPERATOR, "+"),
      new Token(TokenType.EXPRESSION_START, "3"),
      new Token(TokenType.COMPARISON, "="),
      new Token(TokenType.EXPRESSION_START, "4"),
    ]);
  });

  test("should properly compile '(2x + 3)5 = 4/3'", () => {
    const map = c.compile("(2x + 3)5 = 4/3");

    expect(map).toEqual([
      new Token(TokenType.COMPILER_START, null),
      new Token(TokenType.EXPRESSION_START, "("),
      new Token(TokenType.EXPRESSION_CONTINUE, "2"),
      new Token(TokenType.EXPRESSION_CONTINUE, "x"),
      new Token(TokenType.OPERATOR, "+"),
      new Token(TokenType.EXPRESSION_START, "3"),
      new Token(TokenType.EXPRESSION_CONTINUE, ")"),
      new Token(TokenType.EXPRESSION_CONTINUE, "5"),
      new Token(TokenType.COMPARISON, "="),
      new Token(TokenType.EXPRESSION_START, "4"),
      new Token(TokenType.OPERATOR, "/"),
      new Token(TokenType.EXPRESSION_START, "3"),
    ]);
  });
});

describe("Compiler#precompile", () => {
  const pre = c["precompile"];
  test("should crash on invalid equation", () => {
    expect(() => pre("(( x + 2) = 3")).toThrow();
  });

  test("should not crash on valid equation", () => {
    expect(() => pre("(3x) - 4 = (2/3+1)")).not.toThrow();
  });

  test("should not crash on equation that contains no parenthesis", () => {
    expect(() => pre("2x + 4 = 6")).not.toThrow();
  });

  test("should crash on equation that contains only '('", () => {
    expect(() => pre("(X + 3 = 0")).toThrow();
  });

  test("should crash on equation that contains only ')'", () => {
    expect(() => pre(")3 + 4 = 3X")).toThrow();
  });

  test("should add 0 to equation that starts with '-'", () => {
    expect(pre("-24x = 5")).toBe("0 - 24x = 5".replace(/\s/g, ""));
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