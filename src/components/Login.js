import React from 'react'

export default function Login (props) {

  return (
    

    <main>
      <div>{joinPage ? <div className='bg-green-200'>currently in a joining!</div> : <div className='bg-red-200'>not joining</div>}</div>
      { !joinPage? <Create /> : <Join /> }
    </main>

    // <main>
    //   - - - - login - - - 
    //   <button onClick={props.handleLogin}>sign in</button>
    //   - - - - - - - - - - 
    //   </main>
  )
}