import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

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
  font-size: inherit;
  font-weight: inherit;
	overflow: hidden;
	background: transparent;
  -webkit-text-fill-color: transparent;
`;

const Pre = styled.pre`
  position: relative;
	padding: 10px;
	width: inherit;
	height: inherit;
	margin: 0;
  overflow: auto;
	box-sizing: border-box;
	white-space: pre-wrap;
	word-break: break-all;
	word-wrap: break-word;
  font-size: inherit;
  font-weight: inherit;
`;

function App() {
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
      e.currentTarget.value = (`${val}\n`);
      return;
    }

    if (e.key === 'Backspace') {
      // 삭제 기능
      // 기존의 textArea backspace 기능 차단
      e.preventDefault();

      // Drag하지 않은 상태에서 지우기 기능
      // caret이 있는 위치 바로 전에 있는 단어를 하나 지운다.
      const newText = val.substring(0, caretStart - 1) + val.substring(caretEnd);
      e.currentTarget.value = newText;
      e.currentTarget.selectionStart = caretStart - 1;
      e.currentTarget.selectionEnd = caretEnd - 1;
      setValue(e.currentTarget.value);
    }

    if (e.key === 'Shift') {
      return;
    }

    if (e.key === 'Alt') {
      return;
    }

    if (e.key === 'Control') {
      return;
    }

    if (e.key === 'Meta') {
      return;
    }

    if (e.key === 'CapsLock') {
      return;
    }

    if (e.key === 'Tap') {
      return;
    }

    if (e.key === '{') {
      e.currentTarget.value = `${val}{}`;
    }
  }, []);

  return (
    <Wrapper>
      <TextArea
        ref={textAreaRef}
        value={textAreaRef.current?.value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
	    <Pre>{value}</Pre>
    </Wrapper>
  );
}

export default App;
