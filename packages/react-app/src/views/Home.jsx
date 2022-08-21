import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowRightImage from "../assets/ArrowRight.png";
import authorImage from "../assets/author.png";
import lineImage from "../assets/line.png";
import partnershipImage from "../assets/partnership.png";
import profileImage from "../assets/profile.png";
import { Footer, LatestArticles, Newsletter, Splash } from "../components";
import { dataURLtoFile, getBgColorForCategory, getTextColorForCategory } from "../utils/utils";

const server = "https://tdao-api.herokuapp.com";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ address }) {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const getLatestArticle = async () => {
      try {
        const articleResponse = await axios.get(`${server}/api/articles_latest`, {});
        if (articleResponse.data.success) {
          setArticles(articleResponse.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getLatestArticle();
  }, []);

  // Featured Author State
  const [authorName, setAuthorName] = useState("");
  const [authorImageSrc, setAuthorImageSrc] = useState("");
  const [authorAboutme, setAuthorAboutme] = useState("");
  const [authorTwitter, setAuthorTwitter] = useState("");
  const [authorLinkedin, setAuthorLinkedin] = useState("");
  const [authorCategories, setAuthorCategories] = useState([]);
  const [authorWalletId, setAuthorWalletId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${server}/api/authors`);
        if (res.data.success) {
          // randomly choose author just for test
          const length = res.data.data.length;
          // index set for a random author
          const index = Math.floor(Math.random() * length);
          const featuredAuthor = res.data.data[index];

          setAuthorName(featuredAuthor?.username);
          setAuthorAboutme(featuredAuthor?.aboutme);
          setAuthorTwitter(featuredAuthor?.twitter);
          setAuthorLinkedin(featuredAuthor?.linkedin);
          setAuthorCategories(featuredAuthor?.popularCategories);
          setAuthorWalletId(featuredAuthor?.walletId);

          if (featuredAuthor.authorImage.data !== "" && featuredAuthor.authorImage.filename !== "") {
            var file = dataURLtoFile(featuredAuthor?.authorImage?.data, featuredAuthor?.authorImage?.filename);
            var source = URL.createObjectURL(file);
            setAuthorImageSrc(source);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, [address]);

  return (
    <div style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="mx-auto pt-4 max-w-xl md:max-w-4xl xl:max-w-7xl overflow-hidden">
        <Splash address={address} />
        <div className="mx-4 flex flex-row items-center pt-6">
          <img src={profileImage} alt="profile" className="pr-2"></img>
          <div className="text-black font-semibold text-2xl">
            Got Talent? <span className="text-primary">Join Us.</span>
          </div>
        </div>

        {/* Latest Articles Component Section */}
        {articles && <LatestArticles articles={articles} />}

        {/* Featured Author & Updates Section  */}
        <div className="pt-16 grid grid-cols-1 xl:grid-cols-2">
          <div className="mx-4 flex flex-col">
            <div className="text-3xl xl:text-4xl font-bold text-left">
              Featured Author
              <img className="pt-2" alt="featured author" src={lineImage}></img>
            </div>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 items-center">
              <div
                className="rounded-2xl p-4 mr-0 md:mr-8 ml-0 md:ml-4"
                style={{ boxShadow: "2px 0px 9px rgba(0, 0, 0, 0.15)" }}
              >
                <img
                  src={authorImageSrc}
                  alt="none"
                  className="rounded-xl w-full h-full cursor-pointer"
                  onClick={() => navigate(`/author/${authorWalletId}`)}
                ></img>
              </div>
              <div className="flex flex-col items-start text-left">
                {/* <div className="text-sm xl:text-lg text-primary hidden md:block">Author</div>
                <div className="pt-2 text-3xl xl:text-4xl font-bold">James Andrew</div>
                <div className="pt-4 text-base xl:text-sm text-darkgray hidden md:block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </div> */}
                <div
                  className="pt-2 text-3xl xl:text-4xl font-bold cursor-pointer"
                  onClick={() => navigate(`/author/${authorWalletId}`)}
                >
                  {authorName}
                </div>
                <div className="pt-4 text-base xl:text-sm text-darkgray hidden md:block">{authorAboutme}</div>
                <div className="pt-4 flex flex-wrap items-center text-lg">
                  {authorCategories?.map(category => (
                    <div
                      key={Math.random()}
                      className="cursor-pointer rounded-lg px-3 py-1 mr-4 mb-4"
                      style={{
                        background: getBgColorForCategory(category),
                        color: getTextColorForCategory(category),
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex flex-row items-center text-lg space-x-4">
                  <a target="_blank" href={authorTwitter} rel="noopener noreferrer">
                    <svg width="35" height="35" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill={authorTwitter === "" ? "#A3A3A3" : "#B41C2E"} />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M30.9796 12.5928C28.2782 13.036 26.1446 14.8289 25.4302 17.2564C25.3071 17.6745 25.2819 17.9227 25.2783 18.7499C25.2759 19.2956 25.297 19.8593 25.3252 20.0025L25.3765 20.263L24.9279 20.2257C22.0112 19.9832 19.6503 19.3754 17.3007 18.262C15.1307 17.2338 12.8697 15.6194 11.4833 14.1083C11.2762 13.8825 11.077 13.7067 11.0408 13.7177C11.0045 13.7287 10.8609 13.9717 10.7215 14.2579C9.77021 16.2101 9.94776 18.4671 11.1905 20.22C11.5543 20.7331 12.1468 21.3393 12.6283 21.691L13.1293 22.0569H12.8577C12.2767 22.0569 11.0617 21.7592 10.4094 21.4571C10.2648 21.3901 10.1223 21.3354 10.0927 21.3354C9.99915 21.3354 10.1229 22.4375 10.2756 22.9645C10.877 25.0403 12.5741 26.6817 14.8279 27.3678C15.202 27.4817 15.4657 27.5895 15.414 27.6076C15.1152 27.7116 14.1334 27.782 13.3709 27.7539L12.5148 27.7223L12.5575 27.8768C12.6302 28.14 13.1191 28.9832 13.4234 29.3703C14.5939 30.8597 16.5048 31.8826 18.3698 32.0183C18.6522 32.0389 18.8831 32.0762 18.8831 32.1013C18.8831 32.203 17.3986 33.0384 16.4906 33.4477C14.4237 34.3793 12.3812 34.7824 9.97604 34.7332L8.75 34.7081L9.09795 34.9065C9.60471 35.1953 11.14 35.8992 11.83 36.1589C15.5444 37.5572 19.881 37.8755 23.9744 37.0505C29.9984 35.8363 34.9542 32.0386 37.4571 26.7184C38.5273 24.4435 39.0642 22.2095 39.1191 19.8022L39.1438 18.7199L39.6232 18.37C40.2364 17.9225 40.9254 17.3263 41.444 16.794C41.8876 16.339 42.5368 15.5533 42.4984 15.5183C42.4852 15.5064 42.2848 15.567 42.0531 15.653C41.1758 15.9784 39.1404 16.4472 38.8362 16.394C38.761 16.3808 38.8154 16.3221 39.0122 16.2038C39.512 15.9035 40.4049 15.0729 40.7843 14.5552C41.1137 14.1057 41.5956 13.2245 41.5978 13.0678C41.5982 13.0346 41.1921 13.1883 40.6952 13.4092C39.7973 13.8086 38.6259 14.1935 37.7078 14.3908L37.2276 14.4939L36.8261 14.1564C35.2758 12.8532 33.0389 12.255 30.9796 12.5928Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a target="_blank" href={authorLinkedin} rel="noopener noreferrer">
                    <svg width="35" height="35" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="25" fill={authorLinkedin === "" ? "#A3A3A3" : "#B41C2E"} />
                      <path
                        d="M32 13H18C15.239 13 13 15.239 13 18V32C13 34.761 15.239 37 18 37H32C34.762 37 37 34.761 37 32V18C37 15.239 34.762 13 32 13ZM21 32H18V21H21V32ZM19.5 19.732C18.534 19.732 17.75 18.942 17.75 17.968C17.75 16.994 18.534 16.204 19.5 16.204C20.466 16.204 21.25 16.994 21.25 17.968C21.25 18.942 20.467 19.732 19.5 19.732ZM33 32H30V26.396C30 23.028 26 23.283 26 26.396V32H23V21H26V22.765C27.396 20.179 33 19.988 33 25.241V32Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
                <div className="pt-4 flex flex-row items-center text-lg">
                  <div
                    className="cursor-pointer rounded-lg text-green px-3 py-1 mr-4"
                    style={{ background: "rgba(60, 188, 0, 0.22)" }}
                  >
                    History
                  </div>
                  <div
                    className="cursor-pointer rounded-lg text-purple px-3 py-1"
                    style={{ background: "rgba(113, 1, 255, 0.22)" }}
                  >
                    Romance
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 mt-4 md:mt-0 flex flex-col">
            <div className="text-3xl xl:text-4xl font-bold text-left">
              DAO Updates
              <img className="pt-2" src={lineImage} alt="DAO Updates"></img>
            </div>
            <div
              className="relative mt-8 rounded-2xl overflow-hidden"
              style={{ boxShadow: "2px 0px 9px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                {/* <div className="relative bg-dao-image p-4 lg:p-8">
                  <div className="absolute bottom-10">
                    <div className="text-2xl font-bold text-white text-left">TalentDAO partners with Consensys</div>
                  </div>
                </div> */}
                <div className="relative">
                  <img className="w-full h-full" src={partnershipImage} alt="partnershipImage"></img>
                  <div className="absolute bottom-10 left-10">
                    <div className="text-2xl font-bold text-white text-left">TalentDAO partners with Consensys</div>
                  </div>
                </div>
                <div className="p-6 flex flex-col">
                  <div className="text-left text-base xl:text-sm text-darkgray">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in{" "}
                  </div>
                  <div className="flex flex-row justify-between lg:flex-col">
                    <div className="pt-4 flex flex-row items-center text-primary font-semibold text-xl cursor-pointer">
                      <div className="pr-2">Read more</div>
                      <img className="pt-1" src={arrowRightImage} alt="right arrow"></img>
                    </div>
                    <img className="w-8 pt-4" src={authorImage} alt="author"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter Signup Component */}
        <div className="mt-10">
          <Newsletter />
        </div>

        {/* Footer Component Section */}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
