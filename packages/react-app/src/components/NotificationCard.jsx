import React, { useEffect, useState } from "react";

const NotificationCard = ({ state }) => {
  const [styles, setStyles] = useState({ backgroundColor: "#D8FCE4" });

  useEffect(() => {
    if (state == "Published") {
      setStyles({ backgroundColor: "#D8FCE4", color: "#01930F" });
    } else if (state == "Comment") {
      setStyles({ backgroundColor: "#DCE2F6", color: "#0058DD" });
    } else {
      setStyles({ backgroundColor: "#F6DCDC", color: "#B41C2E" });
    }
  }, [state]);

  return (
    <div className="flex flex-row rounded-md border border-gray bg-lightgrey p-4">
      <div className="w-30">
        <div className="flex-auto w-20 h-20 relative rounded-full flex overflow-hidden bg-grey">
          <img id="user-image" className="absolute top-0 left-0 rounded-full" alt="user"></img>
        </div>
      </div>
      <div className="flex flex-col text-left space-y-3 px-4">
        <div className="flex flex-row">
          <div className="font-bold text-xl">Thomas Maxin</div>
          <div className="text-xl text-darkgrey ml-1">on Metaverse, NFT & DEFI, the new wave</div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="text-xl text-darkgrey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. In vitae turpis massa sed elementum...
          </div>
          <div className="text-lg">18 Mar, 2022, 10:43 AM</div>
        </div>
      </div>
      <div>
        <div className="rounded-md py-1 px-3 mr-2 text-lg text-bold" style={styles}>
          {state}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
