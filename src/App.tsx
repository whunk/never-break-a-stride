import './App.css';
import Speed from './Components/Speed.tsx';
import Distance from './Components/Distance.tsx';
import StartReset from './Components/StartReset.tsx';
import React, { useState } from 'react';


const App: React.FC = () => {
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
