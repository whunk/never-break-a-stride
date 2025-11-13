import React, { useState, useEffect } from 'react';
import { Workout } from './types/types';
import { Distance, Speed, WorkoutRunner, WorkoutBuilder, StartReset, IconButton, Modal} from '@/Components';
import { useHeartRate, useDistance, useRunnSensor, useRunnSimulator } from '@/Hooks';
import { HRM, ArrowRightIcon, BluetoothConnectIcon, BuildWorkoutIcon} from '@/Svg';

const App: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    const {heartRate, connectHeartRateMonitor } = useHeartRate();
    const [simulate, setSimulate] = useState(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [workoutStarted, setWorkoutStarted] = useState<boolean>(false);
    const [customWorkout, setCustomWorkout] = useState<Workout | null>(null);
    const [showBuilder, setShowBuilder] = useState(false);

    let treadmillData;
    let connectRunnSensor = () => { }; // dummy function for sim mode

    useEffect(() => {
        let interval: number | null = null;

        if (started) {
            interval = window.setInterval(() => {
                setElapsedTime((t) => t + 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [started]);

    useEffect(() => {
        setElapsedTime(0);
    }, [resetFlag]);


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
                <IconButton icon={BuildWorkoutIcon}
                    onClick={() => setShowBuilder(true)}
                />
            </div>
            <div>
                <div className="SpaceAround">
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <Modal
                            isOpen={showBuilder}
                            onClose={() => setShowBuilder(false)}
                            title="Build Your Workout"
                        >
                            <WorkoutBuilder
                                onWorkoutCreate={(w) => {
                                    console.log("Workout created:", w);
                                    setCustomWorkout(w);
                                    setShowBuilder(false);
                                }}
                            />
                        </Modal>

                        {customWorkout && !workoutStarted && (
                            <IconButton
                                icon={ArrowRightIcon}
                                onClick={() => setWorkoutStarted(true)}
                            />
                        )}

                        {customWorkout && workoutStarted && (
                            <WorkoutRunner
                                workout={customWorkout}
                                distance={distance / 1000}
                                elapsedTime={elapsedTime}
                                onWorkoutComplete={() => {
                                    alert("Workout complete!");
                                    setWorkoutStarted(false);
                                    setCustomWorkout(null);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="SpaceAround">
                <Distance distance={distance} />
                <Speed speed={treadmillData?.speed ?? 0} />
                <StartReset
                    started={started}
                    resetFlag={resetFlag}
                    time={elapsedTime}
                />
            </div>

            <div className="SpaceAround">
                <button className="Button" onClick={handleReset}>Reset</button>
                <button className="Button" onClick={handleEvent}>{!started ? "Start" : "Stop"}</button>
            </div>
        </div>
    );
}

export default App;
