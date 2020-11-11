import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ExtendedSelectableButton, SelectableButtonTypes } from './components/ExtendedSelectableButton/ExtendedSelectableButton';
import { BorderedBox } from './components/BorderedBox/BorderedBox';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ExtendedSelectableButton
          type={SelectableButtonTypes.Important}
          text="Select me!!"
          action={(selected) => {
            alert(selected)
          }}
        />
        <BorderedBox title="Hello" onClick={() => alert("Hello")} />
      </header>
    </div>
  );
}

export default App;
