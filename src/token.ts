import { CharacterType } from './compiler';

enum TokenType {
  COMPILER_START,
  EXPRESSION_START,
  EXPRESSION_CONTINUE,
  OPERATOR,
  ERROR
}

class Token {
  type: TokenType;
  value: any;

  constructor(type: TokenType, value: any) {
    this.type = type;
    this.value = value;
  }

  static generateLogic(characterType: CharacterType, map: object): TokenType {
    const x = map[characterType];
    return x === undefined ? TokenType.ERROR : x;
  }
}

export default Token;
export { TokenType };
