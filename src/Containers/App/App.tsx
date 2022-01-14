import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
	padding: 0;
`;

const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
	width: inherit;
	height: inherit;
	padding: 10px;
	z-index: 1;
	-webkit-text-fill-color: transparent;
`;

const Pre = styled.pre`
  position: relative;
	padding: 10px;
	width: inherit;
	height: inherit;
	margin: 0;
	box-sizing: border-box;
`;

function App() {
	const [text, setText] = useState();

	const handleTextChange = useCallback((e) => {
		const { value } = e.currentTarget;
		setText(value);
	}, []);

  return (
    <Wrapper>
      <TextArea value={text} onChange={handleTextChange} />
	    <Pre>{text}</Pre>
    </Wrapper>
  );
}

export default App;
