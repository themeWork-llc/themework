import React, {useState} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'
import { socket } from '../socket';

export default function Page () {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [text, setText] = useState("")
  const [password, setPassword] = useState("")

  const handleCreateRoom = () => {
    setIsLoggedIn((current) => !current) // user is now logged in so we re-render
    socket.emit('create room')
    socket.on('get text', (...data) => setPassword(data[0])) // sets pw for new room
  }

  const handleJoinRoom = () => {
    setIsLoggedIn((current) => !current) // user is now logged in so we re-render
    socket.emit('join room', password)
    socket.on('document', (...data) => 
    {
    console.log("Document:", data[1])
    setText(data[1]) // sets text to repopulate text editor
    })
  }

  const handleText = (updated) => {
    // after editing text and resetting state to hold new text:
    setText(updated)
    socket.emit('document change', updated)
  }

  return (
    <section>
      password: {password}
      <div>{loggedIn ? <div className='bg-green-200'>currently in a room!</div> : <div className='bg-red-200'>not in room</div>}</div>
      { !loggedIn? <Login handleJoinRoom={handleJoinRoom} handleCreateRoom={handleCreateRoom} password={password}/> : 
      <EditorContainer text={text} handleText={handleText} setText={setText} password={password} setPassword={setPassword} handleCreateRoom={handleCreateRoom}/> }
    </section>
  )
}