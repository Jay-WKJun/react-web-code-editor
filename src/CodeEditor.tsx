import React, { useCallback, useRef, useState } from 'react';
import { highlight, languages } from 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import History from './History';
import TextAreaEditor from './TextAreaEditor';
import {
  Pre,
  Wrapper,
  TextArea,
} from './styles';

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
      value: val,
    } = e.currentTarget;
    const textAreaEditor = new TextAreaEditor(e.currentTarget, val, caretStart, caretEnd);

    function setNewText(
      newText: string,
      caretStartPosition: number,
      caretEndPosition: number,
    ) {
      textAreaEditor.setNewText(newText, caretStartPosition, caretEndPosition);
      setValue(newText);
      History.push(newText);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const currentLineIndent = textAreaEditor.getCurrentLineIndentation();

      if (textAreaEditor.isCaretSurroundedByBracket()) {
        const newText = textAreaEditor.getNewText(
          `\n${' '.repeat(currentLineIndent + indent)}\n${' '.repeat(currentLineIndent)}`,
        );
        const newCaretPosition = caretStart + 1 + currentLineIndent + indent;
        setNewText(newText, newCaretPosition, newCaretPosition);
        return;
      }

      const newText = textAreaEditor.getNewText(`\n${' '.repeat(currentLineIndent)}`);
      const newCaretPosition = caretStart + 1 + currentLineIndent;
      setNewText(newText, newCaretPosition, newCaretPosition);
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      const newText = textAreaEditor.getNewText(' ');
      setNewText(newText, caretStart + 1, caretEnd + 1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const newText = textAreaEditor.getNewText(' '.repeat(indent));
      setNewText(newText, caretStart + indent, caretEnd + indent);
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
      setNewText(newText, caretStart + 1, caretEnd + 1);
    }

    if (e.ctrlKey && e.key.toLocaleLowerCase() === 'z') {
      let newText = '';

      if (e.shiftKey) newText = History.goForward();
      else newText = History.goBack();

      const newCaretPosition = newText.length;

      textAreaEditor.setNewText(newText, newCaretPosition, newCaretPosition);
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
