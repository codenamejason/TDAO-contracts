import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SubmissionCard } from "./SubmissionCard";

const UserSubmissions = ({ address }) => {
  // const [toArticles, goToArticles] = useState(false);
  const [articles, setArticles] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const getArticles = async () => {
    const server = "https://talentdao-api.herokuapp.com";
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

  useEffect(() => {
    getArticles();
  }, [address]);

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex flex-row mb-6 place-content-between">
        <div className="flex flex-row">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM17 5.25L1 5.25V6.75L17 6.75V5.25Z"
              fill="black"
            />
          </svg>
          <div className="ml-1 -mt-0.5 font-bold cursor-pointer">Back</div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row">
            <select
              className="block bg-transparent w-full pl-3 pr-3 py-1 text-lg rounded-2xl"
              style={{border: "1px solid #E6E6E6"}}
            >
              <option>Interest</option>
              <option>Interest</option>
            </select>
          </div>
          <div className="flex flex-row space-x-1 rounded-full p-px bg-grey">
            <div className="px-6 rounded-full text-lg bg-white border border-grey cursor-pointer flex flex-col items-center">
              Reviewer
            </div>
            <div className="px-6 pt-1 rounded-full text-lg text-darkgray cursor-pointer flex flex-col items-center">
              Publisher
            </div>
          </div>
        </div>
      </div>

      {/* {articles.length === 0 ? (
        <div className="flex justify-center">
          <div className="rounded-2xl p-8 bg-white flex flex-col text-left space-y-4">
            <div
              className="rounded-xl text-lg bg-primary text-white text-center cursor-pointer px-4 py-2"
              onClick={() => history.push(`/submit/${address}`)}
            >
              Submit Your First Article
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <SubmissionCard article={article}></SubmissionCard>
          ))}
        </div>
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
        <SubmissionCard></SubmissionCard>
      </div>
    </div>
  );
};

export default UserSubmissions;
