import { notification, Tooltip } from "antd";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
// import FileViewer from "react-file-viewer";
import { pdfjs } from "react-pdf";
// import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useParams } from "react-router-dom";
import article_back from "../assets/article_back.png";
import author_pro from "../assets/author_pro.png";
import ethereum from "../assets/ethereum.png";
import matic from "../assets/matic.png";
import { SimilarArticleCard } from "../components";
import { dataURLtoFile, getAuthorData, readTextFile } from "../utils/utils";
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const server = "https://tdao-api.herokuapp.com/";
// const apiClient = new APIClient(
// "https://lib.openlaw.io/api/v1/default",
// {
//   root: "https://openlaw-instance-with-basic-auth.openlaw.io/api/v1/default",
//   auth: {
//     username: "jason@pharo.tech", //process.env.OL_USERNAME,
//     password: "JaxCodes@1", //process.env.OL_PASSWORD,
//   },
// },
// );
// apiClient.login("jason@pharo.tech", "JaxCodes@1");

const tabType = {
  detail: "details",
  history: "history",
  author: "authors",
};

const Article = ({ readContracts, writeContracts, address, tx }) => {
  const [tab, setTab] = useState(tabType.detail);
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [articleText, setArticleText] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [filename, setFilename] = useState("");
  const [fileData, setFileData] = useState({});
  const [fileId, setFileId] = useState();
  const [template, setTemplate] = useState();

  function onDocumentLoadedSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const TemplateComponent = props => {
    return <div dangerouslySetInnerHTML={{ __html: props.template }} />;
  };

  const { id } = useParams();
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

  const getAuthor = async () => {
    const params = new URLSearchParams([["walletId", address]]);
    const data = getAuthorData(params);
    if (data !== null) {
      setAuthor(data);
    }
  };

  useEffect(() => {
    getArticle();
    getAuthor();
  }, [id]);

  useEffect(() => {
    if (!article) return;
    var file = dataURLtoFile(article?.body?.data, article?.body?.filename);
    var cover = dataURLtoFile(article?.cover?.data, article?.cover?.filename);
    var source = URL.createObjectURL(file);
    var coverSrc = URL.createObjectURL(cover);
    setFileId(article?._id);
    setFilename(article?.body?.filename);
    setFileData(article?.body?.data);
    setArticleText(readTextFile(source));
    console.log(file);
    // console.log(filename.split(".")[1]);
    setCoverImage(coverSrc);
  }, [article]);

  useEffect(() => {
    if (!author) return;
    // var file = dataURLtoFile(author?.)
  }, [author]);

  const mintArticle = async () => {
    // mint the article
    console.log("Mint clicked: ", article);
    await tx(
      writeContracts &&
        writeContracts.TalentDaoNftToken &&
        writeContracts.TalentDaoNftToken.mintNFTForArticle(
          address,
          "https://myipfsuri.com/",
          ethers.utils.parseEther("1"),
        ),
      async update => {
        console.log("📡 Transaction Update:", update);
        if (update.status === 1) {
          notification.open({
            message: "Article NFT Purchased",
            description: "Your NFT has been transferred to your wallet 😍",
            icon: "🚀",
          });
        }
      },
    );
  };

  const scrollTop = () => {
    document.documentElement.scrollTo({
      // @ts-ignore
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollTop();
  }, []);

  // const example = apiClient.getTemplateById("Test Agreement").then(r => setTemplate(r));

  return (
    <div>
      {article && author && (
        <div className="p-4 sm:p-8 md:p-10 xl:p-20 overflow-hidden">
          <div className="flex flex-col 2xl:flex-row items-start justify-between text-left space-x-8">
            <div className="pt-4 flex flex-col items-start space-y-4">
              <div className="flex flex-col-reverse lg:flex-col items-start space-y-4">
                <div className="pt-4 text-5xl lg:text-7xl font-bold">{article.title}</div>
                <div className="rounded-full p-2 w-full bg-gray flex flex-row items-center">
                  <img src={author_pro} className="w-20 rounded-full" alt="author pro"></img>
                  <div className="pl-4 flex flex-col place-content-between">
                    <div className="text-3xl font-bold">{author.username}</div>
                    <div className="text-darkgray font-bold text-sm">{author.bio}</div>
                  </div>
                </div>
              </div>
              <img className="lg:hidden rounded-2xl w-full" src={article_back} alt="article back"></img>
              <div className="lg:hidden text-lg text-left">{articleText}</div>
              <div className="lg:hidden text-primary text-left font-bold">Read more</div>
              <div className="border-b w-full border-gray">
                <ul className="flex cursor-pointer font-bold mb-0">
                  <li
                    className={
                      tab === tabType.detail
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.detail)}
                  >
                    Details
                  </li>
                  <li
                    className={
                      tab === tabType.history
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.history)}
                  >
                    History
                  </li>
                  <li
                    className={
                      tab === tabType.author
                        ? "py-2 px-6 rounded-t-lg border-b-2 border-primary"
                        : "py-2 px-6 rounded-t-lg"
                    }
                    onClick={() => setTab(tabType.author)}
                  >
                    Authors
                  </li>
                </ul>
              </div>
              {tab === tabType.detail ? (
                <div className="w-full border-b border-gray pb-4 flex flex-col space-y-4">
                  <div className="flex flex-col space-y-4">
                    <div className="text-lg text-darkgray">Blockchain</div>
                    <div className="flex flex-row items-center space-x-4">
                      <div className="rounded-full p-1 bg-gray flex flex-row items-center cursor-pointer">
                        <img src={matic} width={26} height={26} alt="matic"></img>
                        <div className="pl-2 text-lg">Matic (Polygon)</div>
                      </div>
                      <div className="rounded-full p-1 bg-gray flex flex-row items-center cursor-pointer">
                        <img src={ethereum} width={26} height={26} alt="ethereum"></img>
                        <div className="pl-2 text-lg">Ethereum</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="text-lg text-darkgray">Dated</div>
                    <div className="flex flex-row items-center">
                      <div className="rounded-full px-4 py-1 bg-gray flex flex-row items-center">
                        <div className="text-lg">January 2015</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : tab === tabType.history ? (
                <div className="flex flex-col text-left">
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-lightgray">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-lightgray">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4">
                    <img className="rounded-full" src={author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="flex flex-col text-lightgray">
                      <div className="text-lg">Listed First edition</div>
                      <div className="text-lg">
                        by <span className="text-black">SaintLucas James Andrew</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-left">
                  <div className="py-4 flex flex-row items-center text-gray space-x-4 cursor-pointer">
                    <img className="rounded-full" src={author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="text-lg text-black">SaintLucas James Andrew</div>
                  </div>
                  <div className="py-4 flex flex-row items-center text-gray space-x-4 cursor-pointer">
                    <img className="rounded-full" src={author_pro} alt="author pro" width={48} height={48}></img>
                    <div className="text-lg text-black">Delman Nick</div>
                  </div>
                </div>
              )}
              <div className="flex flex-row items-center space-x-4">
                <Tooltip title="Export Article">
                  <div
                    className="px-8 py-2 bg-primary text-white text-sm rounded-full cursor-pointer"
                    onClick={e => {
                      console.log("Export clicked: ", e);
                    }}
                  >
                    EXPORT
                  </div>
                </Tooltip>
                <Tooltip title="Mint Article">
                  <div
                    className="px-8 py-2 text-black text-sm rounded-full"
                    style={{ backgroundColor: "rgba(180, 28, 46, 0.15)", cursor: "pointer" }}
                    onClick={e => {
                      mintArticle();
                    }}
                  >
                    MINT
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="hidden 2xl:block mx-auto">
              <img className="rounded-2xl w-full " src={article_back} alt="article back"></img>
            </div>
          </div>
          {/* Need to be able to display any type of file that was saved */}
          <div className="lg:block my-8 max-w-screen-lg mx-auto text-lg text-left">File: {filename}</div>
          <div className="lg:block my-8 max-w-screen-lg mx-auto text-lg text-left">Id: {fileId}</div>
          {filename.split(".")[1] === "txt" ? (
            <div>TEXT</div>
          ) : filename.split(".")[1] === "pdf" ? (
            <Document
              className="hidden lg:block my-8 max-w-screen-lg mx-auto text-lg text-center"
              file={articleText}
              onDocumentLoadedSuccess={onDocumentLoadedSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          ) : filename.split(".")[1] === "docx" ? (
            <div>{/* <FileViewer fileType="docx" filePath={articleText} /> */}</div>
          ) : (
            <div>NEXT</div>
          )}

          <div className="hidden lg:block my-8 max-w-screen-lg mx-auto text-lg text-left">{articleText}</div>
          <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <SimilarArticleCard address={address}></SimilarArticleCard>
            <SimilarArticleCard address={address}></SimilarArticleCard>
            <SimilarArticleCard address={address}></SimilarArticleCard>
            <SimilarArticleCard address={address}></SimilarArticleCard>
          </div>
        </div>
      )}
      <TemplateComponent template={template}></TemplateComponent>
    </div>
  );
};

export default Article;
