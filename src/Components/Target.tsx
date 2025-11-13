import React from "react";
import type { TargetMode } from "../types/types";

interface TargetProps {
    mode: TargetMode;
    currentValue: number;
}

const Target: React.FC<TargetProps> = ({ mode, currentValue }) => {
    const formattedValue =
        mode === "time"
            ? `${Math.ceil(currentValue)}s`
            : `${currentValue.toFixed(2)}km`;

    return (
        <div className="TargetContainer" >
            <h2>{formattedValue}</h2>
        </div>
    );
};

export default Target;