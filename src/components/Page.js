import React, {useState} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

export default function Page () {

  const [loggedIn, setIsLoggedIn] = useState(false)
  const [room, setRoom] = useState({})
  const handleLogin = () => setIsLoggedIn((current) => !current)
  

  return (
    /*
    3 senarios
    create room
    no id, no pw
    join room
    id, no pw
    live room
    id and pw
    */
    <body>
    <h2>MAIN PAGE</h2>
    <section>
      <div>{loggedIn ? <>logged in!</> : <>logged out</>}</div>
      - - - - - - - - - - -
      {!loggedIn?
      <Login handleLogin={handleLogin} room={room}/> :
      <EditorContainer handleLogin={handleLogin}/>
      }
    </section>
    </body>
  )
}