import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/author_pro.png";
import profileImage from "../assets/contact_join_us.png";

const ReviewerCard = ({ article }) => {
  const [src, setSrc] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!article) return;
  //   var file = dataURLtoFile(article?.article?.cover?.data, article?.article?.cover?.filename);
  //   var source = URL.createObjectURL(file);
  //   setSrc(source);
  // }, [article]);

  return (
    <div className="my-1 bg-white p-2 pb-5 flex flex-col space-y-2" style={{ border: "1px solid #F0F1F0" }}>
      <div className="flex flex-col space-y-4 h-28" style={{ background: "#E6E6E6", borderRadius: "2px" }}>
        <img
          id="cover-image"
          alt="coverimage"
          src={profileImage}
          className="flex flex-col object-cover w-full h-28"
        ></img>
      </div>
      <div className="flex flex-row self-center">
        <div
          className="-mt-14 w-24 h-24 border-2 relative border-white rounded-full flex overflow-hidden"
          style={{ backgroundColor: "rgba(220, 220, 220, 1)", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <img id="user-image" className="absolute top-0 left-0 rounded-full" alt="user" src={userImage}></img>
        </div>
      </div>
      <div className="flex flex-row self-center">
        <svg
          className="-mt-8 ml-16 z-1"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 11L19.56 8.21L19.9 4.52L16.29 3.7L14.4 0.5L11 1.96L7.6 0.5L5.71 3.69L2.1 4.5L2.44 8.2L0 11L2.44 13.79L2.1 17.49L5.71 18.31L7.6 21.5L11 20.03L14.4 21.49L16.29 18.3L19.9 17.48L19.56 13.79L22 11ZM9.09 15.72L5.29 11.91L6.77 10.43L9.09 12.76L14.94 6.89L16.42 8.37L9.09 15.72Z"
            fill="#4361EE"
          />
        </svg>
      </div>
      <div className="text-lg font-bold text-center leading-5">James Andrew</div>
      <div className="mx-1 text-base text-center text-lightgray leading-5">
        Oxford Author, Harvard Scholar Best Selling Author, New York Times
      </div>
      <div
        className="mx-16 font-medium text-xs py-1 cursor-pointer"
        style={{
          border: "0.3px solid #B41C2E",
          borderRadius: "40px",
          background: "#FFEEEE",
          color: "#B41C2E",
        }}
        onClick={() => navigate(`/article/${article.article?._id}`)}
      >
        View Profile
      </div>
    </div>
  );
};

export default ReviewerCard;
