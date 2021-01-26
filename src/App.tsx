import React, {useState} from 'react'; 
import './App.css';
import {Testing } from './components/Testing'; 
import { FileSelector, FileNames } from './components/FileSelector';
 


function App() {
  const [file, setFile] = useState<FileNames>('list');

  return (
    <div className="App">
      <header className="App-header"> 
        <FileSelector file={file} onSelect={setFile} />
        <Testing fileName={file} />  
      </header>
    </div>
  );
}

export default App;
