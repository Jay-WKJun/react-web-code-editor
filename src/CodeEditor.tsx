import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  ThemeProvider,
  FlattenSimpleInterpolation,
} from 'styled-components';
import { highlight, languages } from 'prismjs/prism';
import './languages';

import themes from './themes';
import History from './History';
import TextAreaEditor from './TextAreaEditor';
import {
  Pre,
  Wrapper,
  TextArea,
  FontWeight,
} from './styles';

type themeList = keyof typeof themes;
type lang =
  | 'typescript' | 'javascript' | 'java' | 'python' | 'rust'
  | 'ruby' | 'swift' | 'r' | 'c' | 'cpp' | 'csharp'
  | 'cobol' | 'kotlin' | 'haskell' | 'arduino' | 'coffeescript'
  | 'clojure' | 'dart' | 'yaml' | 'markdown' | 'markup'
  | 'docker' | 'graphql' | 'json' | 'css' | 'sass' | 'scss';

interface CodeEditorProps {
  indent?: number
  theme?: themeList | 'light' | 'dark'
  language?: lang
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: FontWeight
  className?: string
  interpolation?: FlattenSimpleInterpolation
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(({
  indent = 2,
  theme = 'light',
  language = 'javascript',
  width,
  height,
  fontSize,
  fontWeight,
  className,
  interpolation,
}, ref) => {
  const textAreaRef = useRef(null);
  useImperativeHandle<HTMLTextAreaElement, HTMLTextAreaElement>(ref, () => textAreaRef.current!);

  const [value, setValue] = useState('');

  const selectedTheme = useMemo(() => themes[theme] || 'light', [theme]);

	const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaElement = e.currentTarget;

    setValue(textAreaElement.value);
    History.push(textAreaElement.value);

    const textArea = textAreaRef.current;
		if (textArea) {
			textArea.style.height = `${textArea.scrollHeight}px`;
		}
	}, [textAreaRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const {
      selectionEnd: caretEnd,
      selectionStart: caretStart,
      value: val,
    } = e.currentTarget;
    const textAreaEditor = new TextAreaEditor(
      e.currentTarget,
      val,
      caretStart,
      caretEnd,
      indent,
    );

    function setNewText(
      newText: string,
    ) {
      setValue(newText);
      History.push(newText);
    }

    textAreaEditor.refreshTextAreaHeight();

    if (e.key === '|') {
      e.preventDefault();
      setNewText(textAreaEditor.executeTextInput(e.key));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      setNewText(textAreaEditor.executeEnterAction());
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      setNewText(textAreaEditor.executeSpaceAction());
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      setNewText(textAreaEditor.executeTabAction());
      return;
    }

    if (/[} | ) | \] | > | ' | " | `]/.test(e.key)) {
      if (textAreaEditor.isParenthesisPaired(e.key)) {
        e.preventDefault();
        textAreaEditor.executeBracketCloseAction();
        return;
      }
    }

    if (/[{ | ( | [ | < | ' | " | `]/.test(e.key)) {
      e.preventDefault();
      setNewText(textAreaEditor.executeBracketOpenAction(e.key));
      return;
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
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
        className={className}
        interpolation={interpolation}
      >
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
        <Pre dangerouslySetInnerHTML={{ __html: highlight(
            value,
            /* @ts-ignore */
            languages[language],
            language,
          )}}
        />
      </Wrapper>
    </ThemeProvider>
  );
});

export default CodeEditor;
