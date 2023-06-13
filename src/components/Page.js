import React, {useState} from 'react'
import Login from './Login';
import EditorContainer from './EditorContainer'

export default function Page () {

  const [loggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn((current) => !current)
  }

  return (
    <body>
    <h2>MAIN PAGE</h2>
    <section>
      <div>{loggedIn ? <>logged in!</> : <>logged out</>}</div>
      - - - - - - - - - - -
      <Login setIsLoggedIn={setIsLoggedIn} />
      <button onClick={handleLogin}>sign in</button>
      <EditorContainer />
    </section>
    </body>
  )
}