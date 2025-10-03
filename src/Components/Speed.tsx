import React, { useEffect, useState } from "react";

const Speed: React.FC<{ speed: number }> = ({ speed }) => {
  const [pace, setPace] = useState<string>("--:--");

    useEffect(() => {
      if (speed > 0.3) {
        const secondsPerKm = 1000 / speed; // seconds
        const minutes = Math.floor(secondsPerKm / 60);
        const seconds = Math.round(secondsPerKm % 60);
        setPace(`${minutes}:${seconds.toString().padStart(2, "0")} min/km`);
      }
    }, [speed]);

    const speedKph = (speed * 3.6).toFixed(1);

    return (
      <div>
        <h1>Pace</h1>
        <h1>{speedKph} km/h</h1>
        <h1>{pace}</h1>
      </div>
    );
};

export default Speed;