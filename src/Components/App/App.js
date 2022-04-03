
import React, { useState } from 'react';
import PianoIcon from '@mui/icons-material/Piano';
import Fretboard from '../Fretboard'
import './App.css';

function App() {
  const [tuning, setTuning] = useState(['E','A','D','G','B','E'])
  const [numFrets, setNumFrets] = useState(12)

  return (
    <div className="App">
      <div className='fretboard-section'>
        <Fretboard tuning={tuning} numFrets={numFrets}/>
      </div>

      
    </div>
  );
}

export default App;
