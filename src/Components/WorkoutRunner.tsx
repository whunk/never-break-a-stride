import React, { useEffect, useState } from "react";
import Target from "./Target";
import type { Workout } from "../types/types";

interface WorkoutRunnerProps {
    workout: Workout;
    distance: number; // live sensor reading in kilometers
    elapsedTime: number; // seconds since treadmill start
    onWorkoutComplete?: () => void;
}

const WorkoutRunner: React.FC<WorkoutRunnerProps> = ({
    workout,
    distance,
    elapsedTime,
    onWorkoutComplete,
}) => {
    const [repeat, setRepeat] = useState<number>(1);
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [startDistance, setStartDistance] = useState<number>(distance);
    const [startTime, setStartTime] = useState<number>(elapsedTime);

    const currentStep = workout.steps[stepIndex];

    // Capture initial distance/time when workout starts
    useEffect(() => {
        if (stepIndex === 0 && repeat === 1) {
            setStartDistance(distance);
            setStartTime(elapsedTime);
        }
    }, [stepIndex, repeat]);

    // Step progression logic
    useEffect(() => {
        if (!currentStep) return;

        const currentDistanceKm = distance - startDistance;
        const currentTimeSeconds = elapsedTime - startTime;

        const progress =
            currentStep.mode === "distance"
                ? currentDistanceKm
                : currentTimeSeconds;

        if (progress >= currentStep.target) {
            // Move to next step or repeat
            if (stepIndex < workout.steps.length - 1) {
                setStepIndex((i) => i + 1);
                setStartDistance(distance);
                setStartTime(elapsedTime);
            } else if (repeat < (workout.repeats ?? 1)) {
                setRepeat((r) => r + 1);
                setStepIndex(0);
                setStartDistance(distance);
                setStartTime(elapsedTime);
            } else {
                onWorkoutComplete?.();
            }
        }
    }, [
        distance,
        elapsedTime,
        currentStep,
        stepIndex,
        repeat,
        workout,
        startDistance,
        startTime,
        onWorkoutComplete,
    ]);

    if (!currentStep) return <div>Workout complete!</div>;

    // Compute remaining values
    const workoutElapsed = elapsedTime - startTime;
    const currentDistanceKm = distance - startDistance;

    const remaining =
        currentStep.mode === "time"
            ? Math.max(0, currentStep.target - workoutElapsed)
            : Math.max(0, currentStep.target - currentDistanceKm);


    return (
        <div className="WorkoutRunnContainer"
        >
            <h3>
                Step {stepIndex + 1}/{workout.steps.length} - Repeat {repeat}/
                {workout.repeats ?? 1}
            </h3>

            <Target mode={currentStep.mode} currentValue={remaining} />

        </div>
    );
};

export default WorkoutRunner;
