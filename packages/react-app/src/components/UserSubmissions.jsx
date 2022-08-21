import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrationImage from "../assets/illustration.png";
import { SubmissionCard } from "../components";

const server = "https://talentdao-api.herokuapp.com";

const UserSubmissions = ({ address }) => {
  // const [toArticles, goToArticles] = useState(false);
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const params = new URLSearchParams([["walletId", address]]);
        const res = await axios.get(server + "/api/articles", { params });
        if (res.data.length === 0) {
          console.log("There is no matched data.");
        } else {
          setArticles(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getArticles();
  }, [address]);

  return (
    <div className="flex flex-col bg-white p-8">
      {articles.length !== 0 ? (
        <div className="flex flex-col mb-6 place-content-between mt-4">
          <div className="flex flex-row mb-6 place-content-between">
            <div className="ml-1 -mt-1 font-bold cursor-pointer text-xl">Submissions</div>
            <div className="flex flex-row space-x-4">
              <div
                className="ml-1 -mt-0.5 cursor-pointer text-lg text-primary"
                onClick={() => navigate(`/user/publisher`)}
              >
                See Reviewers & Publishers
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 12H20M13 5L20 12L13 19"
                  stroke="#B41C2E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {articles.map((item, index) => {
              return <SubmissionCard key={index} article={item}></SubmissionCard>;
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center py-52">
          <img className="self-center w-1/5 mb-6" src={illustrationImage} alt="illustration" />
          <div className="text-center text-xl font-bold mb-1">Nothing to see here</div>
          <div className="text-center text-base mb-6">Upload your next article, document on Talent DAO</div>
          <div
            className="w-1/5 self-center rounded-full text-lg bg-primary text-white text-center cursor-pointer px-4 py-4"
            onClick={() => navigate(`/submit/${address}`)}
          >
            Make A Submission
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSubmissions;
