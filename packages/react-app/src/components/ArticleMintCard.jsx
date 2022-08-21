import { notification } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataURLtoFile } from "../utils/utils";

const ArticleMintCard = ({ article, tx, writeContracts, readContracts, address }) => {
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (article === undefined || article === null) return;
    var data = dataURLtoFile(article?.cover?.data, article?.cover?.filename);
    setCoverImage(URL.createObjectURL(data));
  }, [article]);

  const mintIPNFT = async () => {
    tx(
      writeContracts?.TalentDaoManager?.mintArticleNFT(
        address,
        "https://myipfslocation.com",
        ethers.utils.parseEther("10"),
      ),
      async update => {
        console.log("📡 Transaction Update:", update);
        if (update.status === 1) {
          notification.open({
            message: "Success",
            description: "You have purchased an Article IP NFT 😍",
            icon: "🚀",
          });
          // now to remove the item from this author...
          changeAuthors();
          // need to make sure the Arweave TxId follows the article
        }
      },
    );
  };

  const changeAuthors = async () => {
    //
  };

  return (
    <div
      className="m-3 lg:m-4 rounded-2xl bg-white flex flex-col space-y-4 p-6"
      style={{ boxShadow: "0px 0px 59px -4px rgba(0, 0, 0, 0.19)" }}
    >
      <img className="rounded-xl w-full h-auto" src={coverImage} alt="cover"></img>
      <div className="text-xl font-bold text-left">{article?.title}</div>
      <div className="grid grid-cols-2 space-x-4">
        <div
          className="bg-primary text-white px-4 py-2 rounded-xl cursor-pointer"
          onClick={() => navigate(`/article/${article._id}`)}
        >
          VIEW
        </div>
        <div
          className="border border-primary py-2 rounded-xl cursor-pointer"
          style={{ backgroundColor: "rgba(180, 28, 46, 0.15)" }}
          onClick={() => mintIPNFT()}
        >
          MINT
        </div>
      </div>
    </div>
  );
};

export default ArticleMintCard;
