import React, {useState, useEffect} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'
import { socket } from '../socket';

export default function Page () {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [text, setText] = useState("")
  const [password, setPassword] = useState("")

  //handles creating a room
  const handleCreateRoom = () => {
    setIsLoggedIn((current) => !current)
    socket.emit('create room')
    socket.on('get password', (pass) => {
      setPassword(pass)
      socket.emit('join room', pass)  // join the room after setting the password
    })
  }


  //join room handler
  const handleJoinRoom = () => {
    setIsLoggedIn((current) => !current) // user is now logged in so we re-render
    //console.log('password in handlejoin', password)
    socket.emit('join room', password)
    socket.on('document', (...data) => 
    {
    //console.log("Document:", data[1])
    setText(data[1]) // sets text to repopulate text editor
    })

  }


  const handleText = () => {
    // after editing text and resetting state to hold new text:
    //setText(updated)
    //console.log('inside handle text')
    //console.log('this is text: ', text)
    socket.emit('document change', password, text)
  }

  useEffect(() => {
  
    
    socket.on('get updates', (text) => {
      //console.log('in get updates client side')
      //console.log('text in get uopdates client side: ', text)
      setText(text)
      //console.log('this is newwwww text: ', text)
    })

  
    // Cleanup function to avoid memory leaks
    return () => socket.off('get updates', updateText)
  }, [])
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