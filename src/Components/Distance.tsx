import React, { useEffect, useState } from "react";

const Distance: React.FC<{distance: number}> = ({distance}) => {
  const [distanceM, setDistance] = useState<string>("0.00");
  useEffect(() => {
    if(distance > 0){
      setDistance(`${distance} km`);
    } else {
      setDistance("-.--");
    }
  }, [distance]);
 
  return(
    <div>
      <h1>Distance</h1>
      <h1>{distanceM}</h1>
    </div>
  )
}
export default Distance;
