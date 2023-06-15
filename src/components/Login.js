import React from 'react'

export default function Login (props) {
  return (
    <>
      <button className='ml-20 italic' onClick={props.handleJoinRoom}>join room</button>
      <button className='ml-20 italic' onClick={props.handleCreateRoom}>create room</button>
    </>
  )
}