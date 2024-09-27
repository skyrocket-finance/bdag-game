import React from "react";

const ToonFight = () => {
  const gifToonFight = require('../assets/gifs/toon-fight.gif');

  return (
    <div className="loader-overlay">
      <div className="popup-spinner">

        <img src={gifToonFight} alt="Rocket" width={300} height={300}/>

      </div>
    </div>
  )
}

export default ToonFight;
