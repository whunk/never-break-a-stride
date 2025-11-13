import React, { useEffect, useState } from "react";
import type { Workout, WorkoutStep } from "../types/types";
import { PlusIcon, CrossIcon, ArrowRightIcon} from '@/Svg';
import { IconButton } from '@/Components';

interface WorkoutBuilderProps {
    onWorkoutCreate: (workout: Workout) => void;
}

const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ onWorkoutCreate }) => {
    const [repeats, setRepeats] = useState<number>(1);
    const [steps, setSteps] = useState<WorkoutStep[]>([]);

    useEffect(() => {
        if(steps.length === 0)
            addStep();
    },[]);

    const addStep = () => {
        setSteps([...steps, { type: "run", mode: "distance", target: 0 }]);
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, field: keyof WorkoutStep, value: string | number) => {
        setSteps(prev => {
            const updated = [...prev];
            if (field === "target") {
                updated[index].target = parseFloat(value as string);
            } else if (field === "type") {
                updated[index].type = value as "run" | "rest";
            } else if (field === "mode") {
                updated[index].mode = value as "distance" | "time";
            }
            return updated;
        });
    };

    const handleCreateWorkout = () => {
        if (steps.length === 0) return alert("Add at least one step!");
        onWorkoutCreate({ repeats, steps });
    };

    return (
        <div style={{  color: "#222" }}>
            <div>
                <label>
                    Repeats:
                    <input
                        className="InputStyle InputField"
                        type="number"
                        min={1}
                        value={repeats}
                        onChange={(e) => setRepeats(Number(e.target.value))}
                    />
                </label>
            </div>

            <h4>Steps</h4>
            {steps.map((step, index) => (
                <div key={index} className="step-container">
                    <select className="InputStyle"
                        value={step.type}
                        onChange={(e) => updateStep(index, "type", e.target.value)}
                    >
                        <option className="option" value="run">Run</option>
                        <option className="option" value="rest">Rest</option>
                    </select>

                    <select className="InputStyle"
                        value={step.mode}
                        onChange={(e) => updateStep(index, "mode", e.target.value)}
                    >
                        <option value="distance">Distance (km)</option>
                        <option value="time">Time (s)</option>
                    </select>

                    <input className="InputStyle InputField"
                        type="number"
                        min="0"
                        step="0.01"
                        value={step.target}
                        onChange={(e) => updateStep(index, "target", e.target.value)}
                    />

                    <IconButton
                        className="modal-icon-button"
                        icon={CrossIcon}
                        onClick={() => removeStep(index)}
                    />
                </div>
            ))}

            <IconButton
                className="modal-icon-button"
                icon={PlusIcon}
                onClick={addStep}
            />
            <hr />
            <IconButton
                className="modal-icon-button"
                icon={ArrowRightIcon}
                onClick={handleCreateWorkout}
            />
        </div>
    );
};

export default WorkoutBuilder;
