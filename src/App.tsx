import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Testing } from './components/Testing';
import { BorderedBox } from './components/BorderedBox/BorderedBox';

const array = [{
  label: "what0",
  key: "what0",
}, {
  label: "what1",
  key: "what1",
}, {
  label: "what2",
  key: "what2",
}, {
  label: "what3",
  key: "what3",
}]

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <Testing />  
      </header>
    </div>
  );
}

export default App;
