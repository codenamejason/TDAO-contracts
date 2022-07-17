import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ReviewedPaperCard } from "./ReviewedPaperCard";

const ReviewedPapers = ({ address }) => {

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex flex-row mb-6 place-content-between">
        <div className="ml-1 -mt-1 font-bold cursor-pointer text-lg">Reviewed Papers</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ReviewedPaperCard></ReviewedPaperCard>      
      </div>
    </div>
  );
};

export default ReviewedPapers;
