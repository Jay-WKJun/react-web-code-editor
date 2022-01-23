import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

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

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  min-height: 200px;
	border: 1px solid black;
	padding: 0;
  font-size: 14px;
  font-weight: 100;
`;

const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
	width: inherit;
	min-height: inherit;
	padding: 10px;
	border: none;
	z-index: 1;
	resize: none;
	overflow: hidden;
  font-size: inherit;
  font-weight: inherit;
  white-space: pre-wrap;
	word-break: break-all;
	word-wrap: break-word;
  background: transparent;
  -webkit-text-fill-color: transparent;

  &:focus {
    outline: none;
  }
`;

const Pre = styled.pre`
  position: relative;
	padding: 10px;
	width: inherit;
	height: inherit;
	margin: 0;
  overflow: auto;
	box-sizing: border-box;
  font-size: inherit;
  font-weight: inherit;
	white-space: pre-wrap;
	word-break: break-all;
	word-wrap: break-word;
`;

interface CodeEditorProps {
  indent?: number
}

function CodeEditor({ indent = 2 }: CodeEditorProps) {
  const [value, setValue] = useState('');

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
		if (textAreaRef.current) {
			const textAreaElement = textAreaRef.current;
			textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
		}
	}, [textAreaRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const caretStart = e.currentTarget.selectionStart;
    const caretEnd = e.currentTarget.selectionEnd;
    const val = e.currentTarget.value;

    if (e.key === 'Enter') {
      e.preventDefault();

      // caret이 위치한 줄의 indenting을 읽어낸다.
      let current = caretStart - 1;
      let whiteSpaceCount = 0;
      while (current >= 0) {
        const currentWord = val[current];

        if (currentWord === '\n') break;

        if (currentWord === ' ') whiteSpaceCount += 1;
        else whiteSpaceCount = 0;

        current -= 1;
      }

      if (checkBracketIsPaired(val[caretStart - 1], val[caretEnd])) {
        const newText = `${val.substring(0, caretStart)}\n${' '.repeat(whiteSpaceCount + indent)}\n${' '.repeat(whiteSpaceCount)}${val.substring(caretEnd)}`;
        e.currentTarget.value = newText;
        e.currentTarget.selectionStart = caretStart + 1 + whiteSpaceCount + indent;
        e.currentTarget.selectionEnd = caretStart + 1 + whiteSpaceCount + indent;
        setValue(e.currentTarget.value);
        return;
      }

      const newText = `${val.substring(0, caretStart)}\n${' '.repeat(whiteSpaceCount)}${val.substring(caretEnd)}`;
      e.currentTarget.value = newText;
      e.currentTarget.selectionStart = caretStart + 1 + whiteSpaceCount;
      e.currentTarget.selectionEnd = caretStart + 1 + whiteSpaceCount;
      setValue(e.currentTarget.value);
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      const newText = `${val.substring(0, caretStart)}${' '}${val.substring(caretEnd)}`;
      e.currentTarget.value = newText;
      e.currentTarget.selectionStart = caretStart + 1;
      e.currentTarget.selectionEnd = caretEnd + 1;
      setValue(e.currentTarget.value);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const newText = `${val.substring(0, caretStart)}${' '.repeat(indent)}${val.substring(caretEnd)}`;
      e.currentTarget.value = newText;
      e.currentTarget.selectionStart = caretStart + indent;
      e.currentTarget.selectionEnd = caretEnd + indent;
      setValue(e.currentTarget.value);
      return;
    }

    if (/[} | ) | \] | > | ' | " | `]/.test(e.key)) {
      if (
        (val[caretStart - 1]
        && val[caretEnd])
        && (checkBracketIsPaired(val[caretStart - 1], val[caretEnd])
        || val[caretStart - 1] === val[caretEnd])
      ) {
        e.preventDefault();
        e.currentTarget.selectionStart = caretStart + 1;
        e.currentTarget.selectionEnd = caretEnd + 1;
        return;
      }
    }

    if (/[{ | ( | [ | < | ' | " | `]/.test(e.key)) {
      e.preventDefault();

      let parenthesis = '';
      if (caretStart !== caretEnd) {
        parenthesis = val.substring(caretStart, caretEnd);
      }

      switch (e.key) {
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
          return;
      }

      const newText = `${val.substring(0, caretStart)}${parenthesis}${val.substring(caretEnd)}`;
      e.currentTarget.value = newText;
      e.currentTarget.selectionStart = caretStart + 1;
      e.currentTarget.selectionEnd = caretEnd + 1;
      setValue(e.currentTarget.value);
    }
  }, [indent]);

  return (
    <Wrapper>
      <TextArea
        autoCapitalize="none"
        autoComplete="off"
        autoFocus={false}
        spellCheck={false}
        ref={textAreaRef}
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
      <Pre>{value}</Pre>
    </Wrapper>
  );
}

export default CodeEditor;
