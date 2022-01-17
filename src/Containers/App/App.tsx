import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  min-height: 200px;
	border: 1px solid black;
	padding: 0;
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
`;

function App() {
	const [text, setText] = useState('');

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget;
		setText(value);

		if (textAreaRef.current) {
			const textAreaElement = textAreaRef.current;
			textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
		}
	}, [textAreaRef]);

  return (
    <Wrapper>
      <TextArea ref={textAreaRef} value={text} onChange={handleTextChange} />
	    <Pre>{text}</Pre>
    </Wrapper>
  );
}

export default App;
