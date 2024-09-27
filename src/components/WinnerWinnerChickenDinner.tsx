import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

interface WWCDProps {
  fightResultArray?: any[],
  setFightResultArrayFunc?: (val: any[]) => void
}

const WWCD = ({fightResultArray, setFightResultArrayFunc}: WWCDProps) => {
  const {account} = useWeb3React();

  async function hideWWCDIn5Seconds() {
    setTimeout(() => {
      setFightResultArrayFunc && setFightResultArrayFunc([false, ""]);
    }, 5000);
  }

  if (fightResultArray && fightResultArray[1] && account && account === fightResultArray[1]) {
    console.log("Winner Winner, Chicken Dinner!!!");
    hideWWCDIn5Seconds();

    return (
      <div className="loader-overlay">
        <div className="popup-spinner">

          <span className={"wwcd wwcd-win"}>Winner Winner, Chicken Dinner!!!</span>

        </div>
      </div>
    )
  }

  if (fightResultArray && fightResultArray[1] && fightResultArray[1] !== "" && account && account !== fightResultArray[1]) {
    console.log("Sorry buddy, you lose.");
    hideWWCDIn5Seconds();

    return (
      <div className="loader-overlay">
        <div className="popup-spinner">

          <span className={"wwcd wwcd-lose"}>Sorry buddy, you lose.</span>

        </div>
      </div>
    )
  }

  return (
    <></>
  )
}

export default WWCD;
