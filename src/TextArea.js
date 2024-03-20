import React, { useMemo, useRef } from "react";
import styled, { css } from "styled-components";

const StyledTextareaWrapper = styled.div`
  width: 100%;
  height: 60%;
`;

const sharedStyle = css`
  margin: 0;
  padding: 10px 0;
  height: 700px;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2;
  &:focus-visible {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea`
  ${sharedStyle}
  padding-left: 3.5rem;
  width: 100%;
  border: none;
  &::placeholder {
    color: grey;
  }
`;

const StyledNumbers = styled.div`
  ${sharedStyle}
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  text-align: right;
  box-shadow: none;
  position: absolute;
  color: grey;
  border: none;
  background-color: #303841;
  padding: 10px;
  width: 3rem;
`;

const StyledNumber = styled.div`
  color: ${(props) => (props.active ? "grey" : "inherit")};
`;

const Textarea = ({
  value,
  numOfLines,
  onValueChange,
  placeholder = "Paste your code here...",
  name,
}) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef(null);
  const textareaRef = useRef(null);

  const handleTextareaChange = (event) => {
    onValueChange(event.target.value);
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <StyledTextareaWrapper>
      <StyledNumbers ref={lineCounterRef}>
        {linesArr.map((count) => (
          <StyledNumber active={count <= lineCount} key={count}>
            {count}
          </StyledNumber>
        ))}
      </StyledNumbers>
      <StyledTextarea
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        wrap="off"
      />
    </StyledTextareaWrapper>
  );
};

export default Textarea;
