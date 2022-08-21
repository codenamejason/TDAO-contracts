import React from "react";
import { useNavigate } from "react-router-dom";
import article_back from "../assets/article_back.png";
import author_pro from "../assets/author_pro.png";

const SimilarArticleCard = ({ address, article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="my-3 rounded-xl bg-white p-4 flex flex-col space-y-4"
      style={{ boxShadow: "0px 0px 39px -4px rgba(0, 0, 0, 0.19)" }}
    >
      <div className="flex flex-row items-center text-left space-x-4">
        <img
          alt="similar"
          className="rounded-full cursor-pointer"
          onClick={() => navigate("/author")}
          src={author_pro}
          width={50}
          height={50}
        ></img>
        <div className="flex flex-col">
          <div className="text-sm font-bold">Author James St</div>
          <div className="text-sm">Oxford Author, Harvard Scholar</div>
        </div>
      </div>
      <img alt="article" className="rounded-xl" src={article_back}></img>
      <div className="text-lg">Metaverse, NFT & DEFI, the New Wave</div>
      <div
        className="mx-8 rounded-xl border border-black py-2 text-xl font-bold cursor-pointer"
        onClick={() => navigate("/article")}
      >
        VIEW
      </div>
    </div>
  );
};

export default SimilarArticleCard;
