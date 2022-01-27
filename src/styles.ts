import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 200px;
  min-height: 200px;
	border: 1px solid black;
	padding: 0;
  font-size: 14px;
  font-weight: 100;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  caret-color: ${(props) => props.theme.caretColor};
`;

export const TextArea = styled.textarea`
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

export const Pre = styled.pre`
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

  ${(props) => props.theme.keywords}
`;
