import axios from "axios";
import React, { useEffect, useState } from "react";
import clear from "../assets/clear.svg";
import search from "../assets/search.svg";
import { AuthorCard, Footer, SubmissionCard } from "../components";
import { strcmp } from "../utils/utils";

const server = "https://tdao-api.herokuapp.com";

const AdvancedSearch = () => {
  const [category, setCategory] = useState("author");
  const [field, setField] = useState("username");
  const [sortField, setSortField] = useState("username");
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const history = useHistory();

  // useEffect(() => {
  //   const query = history.location.search.split('=')[1];
  //   setValue(query);
  //   searchForQuery(query);
  // }, []);

  useEffect(() => {
    const sortSearchResult = result => {
      console.log("sortField == ", sortField);
      if (result !== []) {
        let isSorted = false;
        result.sort((a, b) => {
          const swapped = strcmp(b[sortField], a[sortField]);
          if (swapped < 0) isSorted = true;
          return swapped;
        });
        console.log("isSorted == ", isSorted);
        if (isSorted) setSearchResult([...result]);
        else setSearchResult(result);
      }
    };

    sortSearchResult(searchResult);
  }, [searchResult, sortField]);

  const sortSearchResult = result => {
    console.log("sortField == ", sortField);
    if (result !== []) {
      let isSorted = false;
      result.sort((a, b) => {
        const swapped = strcmp(b[sortField], a[sortField]);
        if (swapped < 0) isSorted = true;
        return swapped;
      });
      console.log("isSorted == ", isSorted);
      if (isSorted) setSearchResult([...result]);
      else setSearchResult(result);
    }
  };

  const searchForQuery = async query => {
    const cate = category === "author" ? "/api/author_find" : "/api/article_find";
    const params = new URLSearchParams([
      ["field", field],
      ["value", query],
    ]);
    try {
      const res = await axios.get(server + cate, { params });
      console.log(res);
      if (res.data.success) {
        sortSearchResult(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = async () => {
    await searchForQuery(value);
  };

  const handleCategoryChange = event => {
    setValue("");
    setSearchResult([]);
    setCategory(event.target.value);
    if (event.target.value == "author") {
      setField("username");
      setSortField("username");
    } else {
      setField("title");
      setSortField("title");
    }
  };

  const handleSortFieldChange = event => {
    setSortField(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col" style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="relative" style={{ backgroundColor: "#e2e2e2" }}>
        <div className="lg:mx-auto lg:max-w-2xl overflow-hidden relative text-left space-y-8 py-16">
          <div className="mx-4 flex flex-col items-center justify-center space-y-8">
            <div className="w-full flex flex-row items-center rounded-full bg-white text-white cursor-pointer p-2">
              <input
                type="text"
                className="w-full px-4 text-black text-lg focus:outline-none"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
              <div
                className="w-40 bg-primary rounded-full py-2 text-sm flex flex-row items-center justify-center cursor-pointer"
                onClick={handleSearch}
              >
                <img className="" src={search} width={24} height={24}></img>
                <div>Search</div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-start md:items-end space-x-0 md:space-x-8 space-y-4 md:space-y-0">
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Sort by:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-transparent w-full pl-3 pr-10 py-2 text-lg rounded-xl border border-black"
                  value={sortField}
                  onChange={handleSortFieldChange}
                >
                  {category === "author" ? (
                    <>
                      <option value="username">UserName</option>
                      <option value="bio">Bio</option>
                      <option value="walletId">WalletId</option>
                      <option value="aboutme">About Me</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                    </>
                  ) : (
                    <>
                      <option value="title">Title</option>
                      <option value="walletId">WalletId</option>
                      <option value="price">Price</option>
                      <option value="authors">Authors</option>
                      <option value="abstract">Abstract</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="categories">Categories</option>
                    </>
                  )}
                </select>
              </div>
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Category:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-transparent w-full pl-3 pr-10 py-2 text-lg rounded-xl border border-black"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="author">Author</option>
                  <option value="article">Article</option>
                </select>
              </div>
              <div className="w-full md:w-auto flex flex-col space-y-2">
                <div className="text-sm">Language:</div>
                <select
                  id="select-blockchain"
                  name="select-blockchain"
                  className="mt-1 block bg-transparent w-full pl-3 pr-10 py-2 text-lg rounded-xl border border-black"
                >
                  <option>English</option>
                </select>
              </div>
              <div className="hidden md:flex w-full md:w-auto flex-row items-center pb-4">
                <div className="text-sm" style={{ color: "rgba(133, 133, 133, 1)" }}>
                  Clear all
                </div>
                <img className="px-1" src={clear}></img>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-start md:items-end space-x-0 md:space-x-8 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <div className="text-sm">Journal Title</div>
                <input type="text" className="text-lg rounded-md p-2 focus:outline-none"></input>
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <div className="text-sm">ISBN</div>
                <input type="text" className="text-lg rounded-md p-2 focus:outline-none"></input>
              </div>
            </div>
            <div className="md:hidden w-full md:w-auto flex flex-row items-center pb-4">
              <div className="text-sm" style={{ color: "rgba(133, 133, 133, 1)" }}>
                Clear all
              </div>
              <img className="px-1" src={clear}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-8 md:px-10 xl:px-20 overflow-hidden">
        <div className="text-sm pt-8 text-left">
          {category === "author" ? (
            <div>{searchResult.length} similar Authors found</div>
          ) : (
            <div>{searchResult.length} similar Articles found</div>
          )}
        </div>
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {category === "author"
            ? searchResult.map(item => <AuthorCard key={Math.random()} author={item}></AuthorCard>)
            : searchResult.map(item => <SubmissionCard key={Math.random()} article={item}></SubmissionCard>)}
        </div>
      </div>
      <div className="px-4 sm:px-8 md:px-10 xl:px-20">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AdvancedSearch;
