import React from "react";

const SubmissionCard = article => {
  return (
    <div className="my-1 bg-white pb-5 flex flex-col space-y-2" style={{ border: "1px solid #F0F1F0" }}>
      <div className="flex flex-col space-y-4 h-60" style={{ background: "black", borderRadius: "2px" }}>
        <img id="cover-image" alt="coverimage" className="flex flex-col object-cover w-full h-60"></img>
      </div>
      <div className="text-lg font-bold text-left px-6 pt-8" style={{ fontFamily: "Montserrat", color: "#131313" }}>
        Metaverse, NFT & DEFI, the new wave
      </div>
      <div
        className="mx-1 text-lg text-left px-6"
        style={{ fontFamily: "Montserrat", fontSize: "14px", lineHeight: "20px" }}
      >
        12:20 AM • June 22, 2022
      </div>
    </div>
  );
};

export default SubmissionCard;
