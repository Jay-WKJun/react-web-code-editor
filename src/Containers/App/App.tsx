import React, { useState, useCallback, useRef } from 'react';
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
	const [text, setText] = useState('');

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleTextChange = useCallback(() => {
		if (textAreaRef.current) {
			const textAreaElement = textAreaRef.current;
			textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
		}
	}, [textAreaRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setText(`${text}\n`);
      return;
    }

    if (e.key === 'ArrowRight') {
      return;
    }

    if (e.key === 'ArrowLeft') {
      return;
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

    if (e.key === 'Backspace') {
      setText((prevText) => prevText.slice(0, prevText.length - 1));
      return;
    }

    if (e.key === '{') {
      setText(`${text}{}`);
      return;
    }

    setText(`${text}${e.key}`);
  }, [text]);

  return (
    <Wrapper>
      <TextArea
        ref={textAreaRef}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
	    <Pre>{text}</Pre>
    </Wrapper>
  );
}

export default App;
