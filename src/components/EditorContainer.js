import React, {useState} from 'react'

export default function EditorContainer (props) {
  
  // logic for first render of text box
  
  const [currentText, setCurrentText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
      // logic for submit re-render of text box
    // make PATCH req to db
    // console.log(currentText)
  }

  return (
    <main>
      <button onClick={props.handleLogin}>sign out</button>
      <form>
        {/* input field */}
        <input name='userInput' onChange={(e) => setCurrentText(e.target.value)} defaultValue={currentText} type='text'placeholder='say hello...'></input>
        {/* submit button */}
        <div>
        <button type="submit" onClick={handleSubmit}>submit</button>
        </div>
      </form>
    </main>
  )
}