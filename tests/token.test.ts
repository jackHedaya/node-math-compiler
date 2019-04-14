import Token, { TokenType } from "../src/token";
import { CharacterType } from "../src/compiler";

describe("Token#generateLogic", () => {
  test("should return the correct token", () => {
    expect.assertions(3);

    expect(
      Token.generateLogic(CharacterType.EXPRESSION, {
        [CharacterType.EXPRESSION]: TokenType.EXPRESSION_START,
      }),
    ).toBe(TokenType.EXPRESSION_START);
    expect(
      Token.generateLogic(CharacterType.EXPRESSION, {
        [CharacterType.OPERATOR]: TokenType.COMPILER_START,
      }),
    ).toBe(TokenType.ERROR);
    expect(
      Token.generateLogic(CharacterType.EXPRESSION, {
        [CharacterType.EXPRESSION]: TokenType.EXPRESSION_CONTINUE,
      }),
    ).toBe(TokenType.EXPRESSION_CONTINUE);
  });
});
