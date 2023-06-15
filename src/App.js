import React from 'react'
import './app.css';
import Page from './components/Page';

const App = () => {
  return(
  <main>
    <h1 className="italic text-5xl font-extrabold text-center mt-10" style={{fontFamily: 'sans', fontWeight: '200', color:'#CE0000'}}>theme<span className='not-italic' style={{color:'#000063 '}}>Work</span></h1>
    <Page />
  </main>)
}

export default App
