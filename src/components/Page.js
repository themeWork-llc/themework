import React, {useState} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

export default function Page () {

  const [loggedIn, setIsLoggedIn] = useState(false)
  const handleLogin = () => setIsLoggedIn((current) => !current)
  

  return (
    <body>
    <h2>MAIN PAGE</h2>
    <section>
      <div>{loggedIn ? <>logged in!</> : <>logged out</>}</div>
      - - - - - - - - - - -
      {!loggedIn?
      <Login handleLogin={handleLogin} /> :
      <EditorContainer handleLogin={handleLogin}/>
      }
    </section>
    </body>
  )
}