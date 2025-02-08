import './App.css';
import Speed from './Components/Speed';
import Distance from './Components/Distance';
import StartReset from './Components/StartReset';
import React, { useState } from 'react';


function App() {
  const [started, setStartStop] = useState(false);
  const [reset, setReset] = useState(false);


  const handleEvent = () => {
    setStartStop(!started);
  }
  const handleReset = () => {
    setReset(!reset);
    setStartStop(false);

  }

  return (
    <div className="App">
      <div className="SpaceAround">
      <Distance/>
      <Speed/>
      <StartReset startStop={started} reset={reset}/>
      </div>
      <div className='SpaceAround'>
        <button className='Button' onClick={handleEvent}>{!started ? "Start" : "Stop"}</button>
        <button className='Button' onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
