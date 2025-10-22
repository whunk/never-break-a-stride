import React from "react";

interface DistanceProps {
    distance: number;
}

export const Distance: React.FC<DistanceProps> = ({distance}) => {
  const km =  distance/ 1000; 
  return(
    <div>
      <h1>Distance</h1>
      <h1>{km.toFixed(2)}</h1>
    </div>
  )
}
export default Distance;
