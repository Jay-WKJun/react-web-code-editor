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
  textArea: HTMLTextAreaElement;
  currentText: string;
  caretStart: number;
  caretEnd: number;
  indent: number;

  constructor(
    textArea: HTMLTextAreaElement,
    currentText: string,
    caretStart: number,
    caretEnd: number,
    indent: number,
  ) {
    this.textArea = textArea;
    this.currentText = currentText;
    this.caretStart = caretStart;
    this.caretEnd = caretEnd;
    this.indent = indent;
  }

  executeTextInput(text: string) {
    const { caretStart, caretEnd } = this;
    const newText = this.getNewText(text);
    this.setNewText(newText, caretStart + 1, caretEnd + 1);

    return newText;
  }

  executeEnterAction() {
    const currentLineIndent = this.getCurrentLineIndentation();
    const { indent, caretStart } = this;

    if (this.isCaretSurroundedByBracket()) {
      const newText = this.getNewText(
        `\n${' '.repeat(currentLineIndent + indent)}\n${' '.repeat(currentLineIndent)}`,
      );
      const newCaretPosition = caretStart + 1 + currentLineIndent + indent;
      this.setNewText(newText, newCaretPosition, newCaretPosition);

      return newText;
    }

    const newText = this.getNewText(`\n${' '.repeat(currentLineIndent)}`);
    const newCaretPosition = caretStart + 1 + currentLineIndent;
    this.setNewText(newText, newCaretPosition, newCaretPosition);

    return newText;
  }

  executeSpaceAction() {
    const { caretStart, caretEnd } = this;
    const newText = this.getNewText(' ');

    this.setNewText(this.getNewText(' '), caretStart + 1, caretEnd + 1);

  return newText;
  }

  executeTabAction() {
    const { indent, caretStart, caretEnd } = this;
    const newText = this.getNewText(' '.repeat(indent));

    this.setNewText(newText, caretStart + indent, caretEnd + indent);

    return newText;
  }

  executeBracketCloseAction() {
    const { caretStart, caretEnd } = this;

    this.setCaretPosition(caretStart + 1, caretEnd + 1);
  }

  executeBracketOpenAction(pushedKey: string) {
    const { caretStart, caretEnd } = this;
    const parenthesis = this.getParenthesis(pushedKey);
    const newText = this.getNewText(parenthesis);

    this.setNewText(newText, caretStart + 1, caretEnd + 1);

    return newText;
  }

  refreshTextAreaHeight() {
    this.textArea.style.height = 'auto';
    this.textArea.style.height = `${this.textArea.scrollHeight}px`;
  }

  setNewText(
    text: string,
    startCaretPosition: number = this.caretStart + 1,
    endCaretPosition: number = this.caretEnd + 1,
  ) {
    this.setValue(text);
    this.setCaretPosition(startCaretPosition, endCaretPosition);
  }

  isParenthesisPaired(inputKey: string) {
    const { currentText, caretStart, caretEnd } = this;

    return (
      ((currentText[caretStart - 1] && currentText[caretEnd])
        && this.isCaretSurroundedByBracket(inputKey))
      || (currentText[caretStart - 1] === inputKey)
    );
  }

  private setValue(text: string) {
    this.textArea.value = text;
  }

  private getCurrentLineIndentation() {
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

  private getNewText(textToInsert: string) {
    const front = this.currentText.substring(0, this.caretStart);
    const back = this.currentText.substring(this.caretEnd);

    return `${front}${textToInsert}${back}`;
  }

  private setCaretPosition(startCaretPosition: number, endCaretPosition: number) {
    this.textArea.selectionStart = startCaretPosition;
    this.textArea.selectionEnd = endCaretPosition;
  }

  private getTextInBracket() {
    return this.currentText.substring(this.caretStart, this.caretEnd);
  }

  private isCaretSurroundedByBracket(parenthsis = this.currentText[this.caretEnd]) {
    const { currentText, caretStart } = this;

    return checkBracketIsPaired(currentText[caretStart - 1], parenthsis);
  }

  private getParenthesis(key: string) {
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
