enum TokenType {
  COMPILER_START,
}

class Token {
  type: TokenType;
  value: any;

  constructor(type: TokenType, value: any) {
    this.type = type;
    this.value = value;
  }
}

export default Token;
export { TokenType };
