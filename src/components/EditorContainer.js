import e from 'cors';
import React, { useState, useEffect } from 'react';
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
  border: 3px solid black;
  border-radius: 3px;
  margin-bottom: 1em;
  width: 70%;
  height: 60vh;
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
    //console.log('cursor position', cursorPosition)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/rooms', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: props.password,
        text: props.text
      })
    });
  }

  useEffect(() => {
    console.log('in handlesubmit', props.text);
    props.handleText();
  }, [props.text]);

  return (
    <Main>
      <Button onClick={props.handleLogin}>sign out</Button>
      <Form autocomplete="off" >
        <Input
          name="userInput"
          id="xyz123"

          // for now we should focus on using save btn rather than
          // resetting state in a component

          onChange={(e) => {
            props.setText(e.target.value);
            console.log('this is text from state in on change:', props.text)
            // handleSubmit()
            //handleCursor(e);
          }}
          onClick={handleCursor}
          onKeyDown={handleCursor}
          value={props.text}
          type="text"
          placeholder="say hello..."
          autocomplete="xyz123"
        ></Input>
        <Button onClick={handleSubmit}>
          save
        </Button>
      </Form>
    </Main>
  );
}
