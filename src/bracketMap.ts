export const BRACE_OPEN = '{';
const BRACE_CLOSE = '}';

export const PARENTHESIS_OPEN = '(';
const PARENTHESIS_CLOSE = ')';

export const BRACKET_OPEN = '[';
const BRACKET_CLOSE = ']';

export const CHEVRON_OPEN = '<';
const CHEVRON_CLOSE = '>';

export const QUOTE = "'";
export const DOUBLE_QUOTE = '"';
export const BACKTICK = '`';

const bracketPairs = new Map([
    [BRACE_OPEN, BRACE_CLOSE],
    [PARENTHESIS_OPEN, PARENTHESIS_CLOSE],
    [BRACKET_OPEN, BRACKET_CLOSE],
    [CHEVRON_OPEN, CHEVRON_CLOSE],
]);

export function checkBracketIsPaired(
  forward: string,
  backward: string,
): boolean {
  if (!bracketPairs.has(forward)) return false;

  return bracketPairs.get(forward) === backward;
}
