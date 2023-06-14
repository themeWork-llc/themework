import React from 'react'
import Create from './Create'
import Join from './Join'

export default function Login (props) {


  

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

    <main>
      <div>
        {!props.room.id && !props.room.pw ? <Create />}
        
      </div>
      - - - - login - - - 
      <button onClick={props.handleLogin}>sign in</button>
      - - - - - - - - - - 
    </main>

    // <main>
    //   - - - - login - - - 
    //   <button onClick={props.handleLogin}>sign in</button>
    //   - - - - - - - - - - 
    //   </main>
  )
}