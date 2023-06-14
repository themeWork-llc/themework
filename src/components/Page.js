import React, {useState} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'
import { socket } from '../socket';

export default function Page () {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [text, setText] = useState("")
  const [password, setPassword] = useState("")

  //handles creating a room
  const handleCreateRoom = () => {
    setIsLoggedIn((current) => !current) // user is now logged in so we re-render
    socket.emit('create room')
    socket.on('get password', (pass) => setPassword(pass)) // sets pw for new room
  }


  //join room handler
  const handleJoinRoom = () => {
    setIsLoggedIn((current) => !current) // user is now logged in so we re-render
    //console.log('password in handlejoin', password)
    socket.emit('join room', password)
    socket.on('document', (...data) => 
    {
    console.log("Document:", data[1])
    setText(data[1]) // sets text to repopulate text editor
    })

  }


  const handleText = () => {
    // after editing text and resetting state to hold new text:
    //setText(updated)
    console.log('inside handle text')
    console.log('this is text: ', text)
    socket.emit('document change', password, text)
  }

  socket.on('get updates', (text) => {
    console.log('in get updates,', text)
    setText(text)
  })

  //changes password state
  const passwordHandler = (value) => {
    setPassword(value)
  }

  return (
    <section>
      password: <input defaultValue = {password} onChange={(e) => passwordHandler(e.target.value)}></input>
      <div>{loggedIn ? <div className='bg-green-200'>currently in a room!</div> : <div className='bg-red-200'>not in room</div>}</div>
      { !loggedIn? <Login handleJoinRoom={handleJoinRoom} handleCreateRoom={handleCreateRoom} password={password}/> : 
      <EditorContainer text={text} handleText={handleText} setText={setText} password={password} handleCreateRoom={handleCreateRoom}/> }
    </section>
  )
}