import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { highlight, languages } from 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import History from './History';
import TextAreaEditor from './TextAreaEditor';

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
    History.push(e.currentTarget.value);
		if (textAreaRef.current) {
			const textAreaElement = textAreaRef.current;
			textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
		}
	}, [textAreaRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const {
      selectionEnd: caretEnd,
      selectionStart: caretStart,
      value,
    } = e.currentTarget;
    const textAreaEditor = new TextAreaEditor(e.currentTarget, value, caretStart, caretEnd);

    if (e.key === 'Enter') {
      e.preventDefault();
      const currentLineIndent = textAreaEditor.getCurrentLineIndentation();

      if (textAreaEditor.isCaretSurroundedByBracket()) {
        const newText = textAreaEditor.getNewText(
          `\n${' '.repeat(currentLineIndent + indent)}\n${' '.repeat(currentLineIndent)}`,
        );
        const newCaretPosition = caretStart + 1 + currentLineIndent + indent;
        textAreaEditor.setNewText(newText, newCaretPosition, newCaretPosition);
        setValue(newText);
        History.push(e.currentTarget.value);
        return;
      }

      const newText = textAreaEditor.getNewText(`\n${' '.repeat(currentLineIndent)}`);
      const newCaretPosition = caretStart + 1 + currentLineIndent;
      textAreaEditor.setNewText(newText, newCaretPosition, newCaretPosition);
      setValue(newText);
      History.push(e.currentTarget.value);
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      const newText = textAreaEditor.getNewText(' ');
      textAreaEditor.setNewText(newText, caretStart + 1, caretEnd + 1);
      setValue(newText);
      History.push(e.currentTarget.value);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const newText = textAreaEditor.getNewText(' '.repeat(indent));
      textAreaEditor.setNewText(newText, caretStart + indent, caretEnd + indent);
      setValue(newText);
      History.push(e.currentTarget.value);
      return;
    }

    if (/[} | ) | \] | > | ' | " | `]/.test(e.key)) {
      if (textAreaEditor.isParenthesisPaired()) {
        e.preventDefault();
        textAreaEditor.setCaretPosition(caretStart + 1, caretEnd + 1);
        return;
      }
    }

    if (/[{ | ( | [ | < | ' | " | `]/.test(e.key)) {
      e.preventDefault();
      const parenthesis = textAreaEditor.getParenthesis(e.key);
      const newText = textAreaEditor.getNewText(parenthesis);
      textAreaEditor.setNewText(
        newText,
        caretStart + 1,
        caretEnd + 1,
      );
      setValue(newText);
      History.push(e.currentTarget.value);
    }

    if (e.ctrlKey && e.key.toLocaleLowerCase() === 'z') {
      let newText = '';
      if (e.shiftKey) newText = History.goForward();
      else newText = History.goBack();
      const newCaretPosition = newText.length;

      textAreaEditor.setNewText(
        newText,
        newCaretPosition,
        newCaretPosition,
      );
      setValue(newText);
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
      { /* @ts-ignore */ }
      <Pre dangerouslySetInnerHTML={{ __html: highlight(value, languages.javascript, 'javascript') }} />
    </Wrapper>
  );
}

export default CodeEditor;
