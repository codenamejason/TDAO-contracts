import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrationImage from "../assets/illustration.png";
import { ArticleCard } from "../components";

const UserArticles = ({ address }) => {
  const [articles, setArticles] = useState([]);
  const [articleNfts, setArticleNfts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = () => {
      // the user articles will be IP NFT's
      console.log("Articles loading...", articles);
    };

    getArticles();
  }, [address]);

  return (
    <div className="my-8">
      {articles.length === 0 ? (
        <div className="flex flex-col justify-center py-52">
          <img className="self-center w-1/5 mb-6" src={illustrationImage} alt="illustration" />
          <div className="text-center text-xl font-bold mb-1">Nothing to see here</div>
          <div className="text-center text-base mb-6">Upload your next article, document on Talent DAO</div>
          <div
            className="w-1/5 self-center rounded-full text-lg bg-primary text-white text-center cursor-pointer px-4 py-4"
            onClick={() => navigate(`/submit/${address}`)}
          >
            Submit an Article
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {articles.map((item, index) => {
            return <ArticleCard article={item}></ArticleCard>;
          })}
        </div>
      )}
    </div>
  );
};

export default UserArticles;
