import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../app.css'

const Main = styled.main`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 20px;
  width: 1100px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: #fff;
  background-color: #1687a7;
  border: none;
  cursor: default;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.textarea`
  font-size: 1em;
  color: black;
  padding: 0.5em;
  border-radius: 10px;
  margin-bottom: 1em;
  margin-top: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 80%;
  height: 80vh;
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

  // const [cursorPosition, setCursorPosition] = useState(null);

  // const handleCursor = (e) => {
  //   setCursorPosition(e.target.selectionStart);
  //   //console.log('cursor position', cursorPosition)
  // };

  // const handleSubmit = () => {
  //   console.log('in handlesubmit', props.text)
  //   props.handleText()
  // }

  const ref = useRef(false)
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
    if(ref.current === false){
      ref.current = true;
      return;
    }
    //console.log('in handlesubmit', props.text);
    props.handleText();
  }, [props.text]);

  return (
    <Main>
      <div className='pass' onClick={props.handleLogin}>Room Key: {props.password}</div>
      <Form autocomplete="off" >
        <TextArea
          name="userInput"
          id="xyz123"
          className='input-container'

          // for now we should focus on using save btn rather than
          // resetting state in a component

          onChange={(e) => {
            props.setText(e.target.value);
            //console.log('this is text from state in on change:', props.text)
            // handleSubmit()
            //handleCursor(e);
          }}
          // onClick={handleCursor}
          // onKeyDown={handleCursor}
          value={props.text}
          type="textarea"
          placeholder="say hello..."
          autocomplete="xyz123"
        ></TextArea>
        <Button onClick={handleSubmit}>
          save
        </Button>
      </Form>
    </Main>
  );
}
