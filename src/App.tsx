import React, { useState } from 'react';
import Distance from './Components/Distance';
import Speed from './Components/Speed';
import StartReset from './Components/StartReset';
import { useHeartRate } from './Hooks/HeartRateMonitor';
import { useRunnSensor } from './Hooks/RunnSensor';
import { useDistance } from './Hooks/UseDistance';
import { useRunnSimulator } from './Hooks/UseRunnSimulator';
import IconButton from './Components/IconButton';
import { HRM } from './Svg/HRMIcon';
import { BluetoothConnectIcon } from './Svg/BluetoothConnect';

const App: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    const { heartRate, connectHeartRateMonitor } = useHeartRate();
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
        <div className="App">
            <div className="SpaceAround">
                <div className='InlineFlex'>
                    <IconButton
                        icon={HRM}
                        onClick={connectHeartRateMonitor}
                    />
                    {heartRate !== null && <h2>{heartRate} BPM</h2>}
                </div>

                <IconButton
                    icon={BluetoothConnectIcon}
                    onClick={connectRunnSensor}
                />
            </div>
            <div className="SpaceAround">
                <Distance distance={distance} />
                <Speed speed={treadmillData?.speed ?? 0} />
                <StartReset started={started} resetFlag={resetFlag} />
            </div>

            <div className="SpaceAround">
                <button className="Button" onClick={handleReset}>Reset</button>
                <button className="Button" onClick={handleEvent}>{!started ? "Start" : "Stop"}</button>
            </div>
        </div>
    );
}

export default App;
