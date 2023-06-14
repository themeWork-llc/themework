import React, {useState, useEffect} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

export default function Page () {
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [room, setRoom] = useState({})
  const handleLogin = () => setIsLoggedIn((current) => !current)
  
  return (
    <section>
      <div>{loggedIn ? <div className='bg-green-200'>currently in a room!</div> : <div className='bg-red-200'>not in room</div>}</div>
      { !loggedIn? <Login handleLogin={handleLogin} /> : 
      <EditorContainer handleLogin={handleLogin}/> }
    </section>
  )
}