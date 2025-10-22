import './App.css';
import React, { useState } from 'react';
import Distance from './Components/Distance';
import Speed from './Components/Speed';
import StartReset from './Components/StartReset';
import { useHeartRate } from './Hooks/HeartRateMonitor';
import { useRunnSensor } from './Hooks/RunnSensor';
import { useDistance } from './Hooks/UseDistance';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const { heartRate, connectHeartRateMonitor } = useHeartRate();
  const { treadmillData, connectRunnSensor } = useRunnSensor();

  const handleEvent = () => {
    setStarted(prev => !prev);
  };

  const handleReset = () => {
    setResetFlag(prev => !prev);
    setStarted(false); 
  };

  const distance = useDistance({
    speed: treadmillData?.speed ?? 0,
    started,
    resetFlag,
  });

  return (
    <div className="App">

        <div className="SpaceAround">
         <button onClick={connectHeartRateMonitor}>Connect to Heart Rate Monitor</button>
        {heartRate !== null && <p>Heart Rate: {heartRate} BPM</p>}

        <button onClick={connectRunnSensor}>Connect RunnSpeedSensor</button>
      </div>
      
      <div className="SpaceAround">
      <Distance distance={distance}/>
      <Speed speed={treadmillData?.speed ?? 0}/>
      <StartReset started={started} resetFlag={resetFlag}/>
      </div>
    
      <div className='SpaceAround'>
        <button className='Button' onClick={handleReset}>Reset</button>
        <button className='Button' onClick={handleEvent}>{!started ? "Start" : "Stop"}</button>
      </div>
      
    </div>
  );
}

export default App;
