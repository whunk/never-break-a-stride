import React from "react";

interface StartResetProps {
  started: boolean;
  resetFlag: boolean;
  time: number; // seconds passed
}

const StartReset: React.FC<StartResetProps> = ({ started, resetFlag, time }) => {
  // Format time (HH:MM:SS)
  const formatTime = () => {
    const hours = Math.floor(time / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="Container">
      <h1>{formatTime()}</h1>
    </div>
  );
};

export default StartReset;