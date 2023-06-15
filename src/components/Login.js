import React from 'react'

export default function Login (props) {
  return (
    <>
    <div>
      <button onClick={props.handleCreateRoom}>create room</button>
    </div>
    <div>
      <button onClick={props.handleJoinRoom}>join room</button>
    </div>
    </>
  )
}