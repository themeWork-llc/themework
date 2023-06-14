import React, {useState} from 'react'

export default function EditorContainer (props) {

  const handleSubmit = (e) => {
    e.preventDefault()
      // logic for submit re-render of text box
    // send props.text to back end
    console.log('text:', props.text)
  }

  return (
    <main>
      <button onClick={props.handleLogin}>sign out</button>
      <form>
        <input name='userInput' onChange={(e) => props.setText(e.target.value)} defaultValue={props.text} type='text'placeholder='say hello...'></input>
        <div>
        <button type="submit" onClick={handleSubmit}>submit</button>
        </div>
      </form>
    </main>
  )
}