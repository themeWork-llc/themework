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
        <button className='bg-transparent hover:bg-red-500 hover:text-white text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center' onClick={handleSubmit}>
          <svg className="text-black dark:text-white pr-3" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 407.10 407.10">
            <path className="text-black dark:text-white" d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/>
            <path className="text-black dark:text-white" d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/>
          </svg>
          save
        </button>
      </Form>
    </Main>
  );
}
    