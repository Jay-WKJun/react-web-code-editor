import {
  QUOTE,
  BACKTICK,
  BRACE_OPEN,
  BRACKET_OPEN,
  CHEVRON_OPEN,
  DOUBLE_QUOTE,
  PARENTHESIS_OPEN,
  checkBracketIsPaired,
} from './bracketMap';

class TextAreaEditor {
  constructor(
    private textArea: HTMLTextAreaElement,
    private currentText: string,
    private caretStart: number,
    private caretEnd: number,
  ) {}

  getCurrentLineIndentation() {
    let current = this.caretStart - 1;
    let whiteSpaceCount = 0;
    while (current >= 0) {
      const currentWord = this.currentText[current];

      if (currentWord === '\n') break;

      if (currentWord === ' ') whiteSpaceCount += 1;
      else whiteSpaceCount = 0;

      current -= 1;
    }

    return whiteSpaceCount;
  }

  getNewText(textToInsert: string) {
    const front = this.currentText.substring(0, this.caretStart);
    const back = this.currentText.substring(this.caretEnd);

    return `${front}${textToInsert}${back}`;
  }

  setNewText(text: string, startCaretPosition: number, endCaretPosition: number) {
    this.textArea.value = text;
    this.setCaretPosition(startCaretPosition, endCaretPosition);
  }

  setCaretPosition(startCaretPosition: number, endCaretPosition: number) {
    this.textArea.selectionStart = startCaretPosition;
    this.textArea.selectionEnd = endCaretPosition;
  }

  getTextInBracket() {
    return this.currentText.substring(this.caretStart, this.caretEnd);
  }

  isCaretSurroundedByBracket(parenthsis = this.currentText[this.caretEnd]) {
    const { currentText, caretStart } = this;

    return checkBracketIsPaired(currentText[caretStart - 1], parenthsis);
  }

  isParenthesisPaired(inputKey: string) {
    const { currentText, caretStart, caretEnd } = this;

    return (
      ((currentText[caretStart - 1] && currentText[caretEnd])
        && this.isCaretSurroundedByBracket(inputKey))
      || (currentText[caretStart - 1] === inputKey)
    );
  }

  getParenthesis(key: string) {
    let parenthesis = '';
    if (this.caretStart !== this.caretEnd) {
      parenthesis = this.getTextInBracket();
    }

    switch (key) {
      case BRACE_OPEN:
        parenthesis = `{${parenthesis}}`;
        break;
      case PARENTHESIS_OPEN:
        parenthesis = `(${parenthesis})`;
        break;
      case BRACKET_OPEN:
        parenthesis = `[${parenthesis}]`;
        break;
      case CHEVRON_OPEN:
        parenthesis = `<${parenthesis}>`;
        break;
      case QUOTE:
        parenthesis = `'${parenthesis}'`;
        break;
      case DOUBLE_QUOTE:
        parenthesis = `"${parenthesis}"`;
        break;
      case BACKTICK:
        parenthesis = `\`${parenthesis}\``;
        break;
      default:
    }

    return parenthesis;
  }
}

export default TextAreaEditor;
