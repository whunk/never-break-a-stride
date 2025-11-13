export type TargetMode = "time" | "distance";
export type StepType = "run" | "rest";

export type WorkoutStep = {
    type: "run" | "rest";
    mode: "distance" | "time";
    target: number;
}

export interface Workout {
    repeats?: number;
    steps: WorkoutStep[];
}