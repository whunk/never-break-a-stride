import './App.css';
import Speed from './Components/Speed';
import Distance from './Components/Distance';
import StartReset from './Components/StartReset';
import React, { useState } from 'react';
import { useHeartRate } from './Hooks/HeartRateMonitor';
import { useRunnSensor } from './Hooks/RunnSensor';

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
  return (
    <div className="App">

        <div className="SpaceAround">
         <button onClick={connectHeartRateMonitor}>Connect to Heart Rate Monitor</button>
        {heartRate !== null && <p>Heart Rate: {heartRate} BPM</p>}

        <button onClick={connectRunnSensor}>Connect RunnSpeedSensor</button>
        {/*treadmillData !== null && <p>Incline: {treadmillData.incline} %</p>*/}
      </div>
      
      <div className="SpaceAround">
      <Distance distance={0}/>
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
