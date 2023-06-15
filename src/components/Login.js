import React from 'react'

export default function Login (props) {
  return (
    <>
      <button className='bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded' onClick={props.handleJoinRoom} style={{width: '135px', fontFamily:'sans-serif', fontWeight:'200', backgroundColor:'#CE0000', color:'white'}}>Join Room</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={props.handleCreateRoom} style={{width: '135px', fontFamily:'sans-serif', fontWeight:'200', backgroundColor:'#000063'}}>Create Room</button>
    </>
  )
}