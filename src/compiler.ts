import Token, { TokenType } from "./token";

class Compiler {
  map: Token[] = [];

  characterMappings = {
    operators: ["+", "-", "/", "*", "^"],
    expressions: ["(", ")"]
  };

  constructor() {
    this.map = [];
    
    this.map.push(new Token(TokenType.COMPILER_START, null));
  }

  characterToType(char: string): string | null {
    const entries = Object.entries(this.characterMappings);
    
    for (var [key, e] of entries) {
      var entry = e as string[];
      if (entry.includes(char)) return key;
    }

    return null;
  }

  compile(expression: string) {
    for (var char of expression) {
      const t = this.generateToken(char, this.map[this.map.length - 1]);
    }
  }

  generateToken(char: string, lastToken: Token) {
    const type = this.characterToType(char);
    if (!type) throw `Invalid begging of equation '${char}'`;

    switch (lastToken.type) {
      case TokenType.COMPILER_START:
        console.log("HI");
        break;
      default: break;
    }
  }
}

export default Compiler;
