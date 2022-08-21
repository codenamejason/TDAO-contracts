import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authorimg from "../assets/author.png";
import etherImage from "../assets/ethereum.png";
import heartImage from "../assets/heart.png";
import talentImage from "../assets/talent.png";
import { dataURLtoFile } from "../utils/utils";

const server = "https://talentdao-api.herokuapp.com";

export const ArticleCard = ({ id }) => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const params = new URLSearchParams([["_id", id]]);
        const articleResponse = await axios.get(server + "/api/articles", { params });
        if (articleResponse.data.success) {
          setArticle(articleResponse.data.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getArticle();
  }, [id]);

  useEffect(() => {
    const getAuthorData = async () => {
      const params = new URLSearchParams([["walletId", article.walletId]]);
      try {
        const res = await axios.get(server + "/api/authors", { params });
        if (res?.data?.success) {
          setAuthor(res?.data?.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (!article) return;
    var cover = dataURLtoFile(article?.cover?.data, article?.cover?.filename);
    var coverSrc = URL.createObjectURL(cover);
    setCoverImage(coverSrc);
    getAuthorData();
  }, [article]);

  useEffect(() => {
    if (!author) return;
    if (author?.authorImage?.data.length === 0 || author?.authorImage?.filename.length === 0) {
      setAuthorImage(null);
    } else {
      var image = dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename);
      var authorSrc = URL.createObjectURL(image);
      setAuthorImage(authorSrc);
    }
  }, [author]);

  return (
    <div className="flex flex-col justify-center mx-2 my-4">
      <div className="rounded-2xl shadow-lg max-w-sm p-4" style={{ background: "#F1F1F1" }}>
        <a href="#!">
          {coverImage && (
            <img
              className="rounded-xl cursor-pointer w-full h-32 bg-cover bg-center"
              src={coverImage}
              alt=""
              onClick={() => navigate("/article")}
            />
          )}
        </a>
        <div className="pt-4 flex flex-col">
          <div className="h-10 flex flex-row justify-between items-start">
            <div className="text-xl text-left font-bold cursor-pointer" onClick={() => navigate("/article")}>
              {article && article.title}
            </div>
            <div className="flex flex-row items-center">
              <img src={talentImage} className="-mr-2" alt="talent"></img>
              <img src={etherImage} alt="ethereum"></img>
            </div>
          </div>
          <div className="pt-8 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate("/author")}>
              {authorImage ? (
                <img alt="author" src={authorImage} width={30} height={30}></img>
              ) : (
                <img alt="author" src={authorimg} width={30} height={30}></img>
              )}
              <div className="pl-2 text-lg text-darkgray">{author?.username}</div>
            </div>
            <img src={heartImage} alt="heart"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
