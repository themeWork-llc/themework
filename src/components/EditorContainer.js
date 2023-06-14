import React, {useState} from 'react'

export default function EditorContainer (props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleText(props.text)
  }

  return (
    <main>
      <button onClick={props.handleJoin}>leave</button>
      <form>
        <input name='userInput' onChange={(e) => props.setText(e.target.value)} defaultValue={props.text} type='text'placeholder='say hello...'></input>
        <div>
        <button type="submit" onClick={handleSubmit}>save</button>
        </div>
      </form>
    </main>
  )
}