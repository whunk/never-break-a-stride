// import './App.css';
import React, { useState } from 'react';
import Distance from './Components/Distance';
import Speed from './Components/Speed';
import StartReset from './Components/StartReset';
import { useHeartRate } from './Hooks/HeartRateMonitor';
import { useRunnSensor } from './Hooks/RunnSensor';
import { useDistance } from './Hooks/UseDistance';
import { useRunnSimulator } from './Hooks/UseRunnSimulator';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const { heartRate, connectHeartRateMonitor } = useHeartRate();
  //const { treadmillData, connectRunnSensor } = useRunnSensor();
  const [simulate, setSimulate] = useState(false);

  let treadmillData;
  let connectRunnSensor = () => { }; // dummy function for sim mode

  if (simulate) {
    treadmillData = useRunnSimulator(started);
  } else {
    const realSensor = useRunnSensor();
    treadmillData = realSensor.treadmillData;
    connectRunnSensor = realSensor.connectRunnSensor;
  }

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
    <div className="text-center grid items-center h-screen">
      <div className="w-full inline-flex justify-around">
        <button onClick={connectHeartRateMonitor}>Connect to Heart Rate Monitor</button>
        {heartRate !== null && <p>Heart Rate: {heartRate} BPM</p>}

        <button onClick={connectRunnSensor}>Connect RunnSpeedSensor</button>
      </div>
      <div className="w-full inline-flex justify-around">
        <Distance distance={distance} />
        <Speed speed={treadmillData?.speed ?? 0} />
        <StartReset started={started} resetFlag={resetFlag} />
      </div>

<div className="w-full inline-flex justify-around">
        <button className="rounded-[15px] bg-transparent text-[whitesmoke] border-2 border-[#e7e7e7] w-[18rem] h-[6rem] text-[3em] font-bold" onClick={handleReset}>Reset</button>
        <button className="rounded-[15px] bg-transparent text-[whitesmoke] border-2 border-[#e7e7e7] w-[18rem] h-[6rem] text-[3em] font-bold" onClick={handleEvent}>{!started ? "Start" : "Stop"}</button>
      </div>
   </div>
  );
}

export default App;
