import React, {useState, useEffect} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

import { socket } from '../socket';
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { Events } from './Events';
import { MyForm } from './MyForm';

export default function Page () {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const [createButtonPress, setCreateButtonPress] = useState(false)
  const [createJoinPress, setCreateJoinPress] = useState(false)
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [text, setText] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = () => setIsLoggedIn((current) => !current)
  
  

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      // if we are disconnecting our last connection there will be no way to save the current text 
      // data to our db
      //
      // setInterval? or just every time the data is manipulated
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <section>

      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />


      <div>{loggedIn ? <div className='bg-green-200'>currently in a room!</div> : <div className='bg-red-200'>not in room</div>}</div>
      { !loggedIn? <Login handleLogin={handleLogin} text={text} password={password}/> : 
      <EditorContainer text={text} setText={setText} password={password} setPassword={setPassword} handleLogin={handleLogin}/> }
    </section>
  )
}