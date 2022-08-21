import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataURLtoFile } from "../utils/utils";

let file;
let source;

export const AuthorCard = ({ author }) => {
  const [srcCover, setSrcCover] = useState(null);
  const [srcAuthor, setSrcAuthor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!author) return;
    if (author.coverImage.data !== "" && author.coverImage.filename !== "") {
      file = dataURLtoFile(author?.coverImage?.data, author?.coverImage?.filename);
      source = URL.createObjectURL(file);
      setSrcCover(source);
    }

    if (author.authorImage.data !== "" && author.authorImage.filename !== "") {
      file = dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename);
      source = URL.createObjectURL(file);
      setSrcAuthor(source);
    }
  }, [author]);
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <img className="rounded-t-lg" src={srcCover} alt="" />
        <div className="pb-4 flex flex-col items-center space-y-2">
          <img src={srcAuthor} alt="author" className="w-16 h-16 rounded-full -mt-8"></img>
          <div className="text-2xl font-bold text-black">{author.username}</div>
          <div className="text-lg text-black">{author.bio}</div>
          <div
            className="rounded-xl border border-primary font-bold px-8 py-2 text-primary cursor-pointer"
            onClick={() => navigate(`/author/${author.walletId}`)}
          >
            Visit Page
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
