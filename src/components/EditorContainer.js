import React, { useState } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #fafafa;
  padding: 20px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: #fff;
  background-color: #1687a7;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 0.5em;
  border: none;
  border-radius: 3px;
  margin-bottom: 1em;
  width: 70%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #fafafa;
  resize: none;
  vertical-align: top;
  &:focus {
    outline: none;
  }
  &[autocomplete='off'] {
    -webkit-appearance: none;
  }
`;


export default function EditorContainer(props) {

  const [cursorPosition, setCursorPosition] = useState(null);

  const handleCursor = (e) => {
    setCursorPosition(e.target.selectionStart);
    console.log('cursor position', cursorPosition)
  };

  const handleChangeText = (e) => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // logic for submit re-render of text box
    // send props.text to back end
    console.log('text:', props.text);

  };

  return (
    <Main>
      <Button onClick={props.handleLogin}>sign out</Button>
      <Form autocomplete="off">
        <Input
          name="xyz123"
          id="xyz123"
          onChange={(e) => {
            props.setText(e.target.value);
            console.log(props.text)
            handleCursor(e);
          }}
          onClick={handleCursor}
          onKeyDown={handleCursor}
          defaultValue={props.text}
          type="text"
          placeholder="say hello..."
          autocomplete="xyz123"
        ></Input>
        <Button type="submit" onClick={handleSubmit}>
          submit
        </Button>
      </Form>
    </Main>
  );
}
