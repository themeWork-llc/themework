import React, {useState, useEffect} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

import { socket } from '../socket';
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';

export default function Page () {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [createButtonPress, setCreateButtonPress] = useState(false)
  const [createJoinPress, setCreateJoinPress] = useState(false)
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [text, setText] = useState("")
  const [password, setPassword] = useState("randomPassword")

  const handleJoin = () => {
    // regardless of if creating or joining room, now logged in/out:
    setIsLoggedIn((current) => !current)

    // if creating room:
    socket.emit('create room')

    socket.on('document', (...data) => {
      console.log("get text", data)
    })

    // if joining existing room:
    socket.emit('join room', password);

    socket.on('document', (...data) => {
      console.log("Document:", data)
    })

    // re-render page w/ text editor either way
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);    
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <section>
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <div>{loggedIn ? <div className='bg-green-200'>currently in a room!</div> : <div className='bg-red-200'>not in room</div>}</div>
      { !loggedIn? <Login handleJoin={handleJoin} password={password}/> : 
      <EditorContainer text={text} setText={setText} password={password} setPassword={setPassword} handleJoin={handleJoin}/> }
    </section>
  )
}