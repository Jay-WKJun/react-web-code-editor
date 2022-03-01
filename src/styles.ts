import styled, { FlattenSimpleInterpolation } from 'styled-components';

const PADDING_PIXEL = '10px';

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold';

interface WrapperProps {
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: string
  interpolation?: FlattenSimpleInterpolation
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: ${(props) => props.width || '200px'};
  min-height: ${(props) => props.height || '200px'};;
	padding: 0;
	border: 1px solid black;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || 'bold'};
  border-radius: ${PADDING_PIXEL};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColor};
  caret-color: ${(props) => props.theme.caretColor};
  text-align: left !important;

  ${(props) => props.interpolation}
`;

export const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
	width: inherit;
	min-height: inherit;
	padding: ${PADDING_PIXEL};
	border: none;
  box-sizing: border-box;
	z-index: 1;
	resize: none;
	overflow: hidden;
  font-size: inherit;
  font-weight: inherit;
  text-align: inherit;
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
	width: inherit;
	height: inherit;
	margin: 0;
	padding: ${PADDING_PIXEL};
  overflow: auto;
	box-sizing: border-box;
  font-size: inherit;
  font-weight: inherit;
  text-align: inherit;
	white-space: pre-wrap;
	word-break: break-all;
	word-wrap: break-word;

  ${(props) => props.theme.keywords}
`;
