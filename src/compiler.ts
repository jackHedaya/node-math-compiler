import Token, { TokenType } from "./token";
import * as isLetter from "is-letter";

enum CharacterType {
  EXPRESSION,
  WHITESPACE,
  OPERATOR,
  COMPARISON,
  ERROR,
}

type CharacterToType = { [key in CharacterType]?: TokenType };

class Compiler {
  map: Token[] = [];

  private characterMappings = {
    operator: ["+", "-", "/", "*", "^"],
    expression: ["(", ")"],
    comparison: ["=", "<", ">"],
  };

  constructor() {
    this.map.push(new Token(TokenType.COMPILER_START, null));
  }

  characterToType(char: string): CharacterType {
    if (parseInt(char) || isLetter(char)) return CharacterType.EXPRESSION;
    if (char === " ") return CharacterType.WHITESPACE;

    const entries = Object.entries(this.characterMappings);

    for (var [key, e] of entries) {
      var entry = e as string[];
      if (entry.includes(char)) return CharacterType[key.toUpperCase()];
    }

    return CharacterType.ERROR;
  }

  private precompile(equation: string): string {
    var edited = equation;

    const openMatch = equation.match(/\(/g) || [];
    const closedMatch = equation.match(/\)/g) || [];
    if (openMatch.length !== closedMatch.length) {
      throw "Invalid equation given."
    }

    if (edited[0] === "-") edited = "0" + edited;
    // Future mutations go here

    return edited;
  }

  compile(equation: string) {
    const eq = this.precompile(equation);
    for (var char of eq) {
      const newToken = this.generateToken(char, this.map[this.map.length - 1]);

      this.map.push(newToken);
    }
  }

  generateToken(char: string, lastToken: Token): Token {
    const characterType = this.characterToType(char);

    if (characterType === CharacterType.ERROR)
      throw `Invalid character '${char}'`;

    let characterToType: CharacterToType;

    switch (lastToken.type) {
      case TokenType.COMPILER_START:
        characterToType = {
          [CharacterType.EXPRESSION]: TokenType.EXPRESSION_START,
        };

        break;

      case TokenType.EXPRESSION_START:
        characterToType = {
          [CharacterType.EXPRESSION]: TokenType.EXPRESSION_CONTINUE,
          [CharacterType.OPERATOR]: TokenType.OPERATOR,
        };

        break;

      case TokenType.OPERATOR:
        characterToType = {
          [CharacterType.EXPRESSION]: TokenType.EXPRESSION_START,
          [CharacterType.OPERATOR]: TokenType.OPERATOR,
        };

        break;

        // case TokenType.WHITESPACE:
        //   characterToType = {
        //     [CharacterType.EXPRESSION]: TokenType.
        //   }

    }
    if (!characterToType) {
      console.log(CharacterType[characterType]); 
      console.log(TokenType[lastToken.type])
    }
    let newTokenType = Token.generateLogic(characterType, characterToType);

    return new Token(newTokenType, char);
  }
}

export default Compiler;
export { CharacterType };
