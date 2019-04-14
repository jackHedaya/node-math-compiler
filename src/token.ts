import { CharacterType } from './compiler';

enum TokenType {
  COMPILER_START,
  EXPRESSION_START,
  EXPRESSION_CONTINUE,
  OPERATOR,
  COMPARISON,
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
    if (!map) 
      throw `Map not given, characterType = ${CharacterType[characterType]}`
      
    const x = map[characterType];
    return x === undefined ? TokenType.ERROR : x;
  }

  public toString(): string {
    return `{"type": ${TokenType[this.type]}, "value": ${this.value}}`
  }
}

export default Token;
export { TokenType };
