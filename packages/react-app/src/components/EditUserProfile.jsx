import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { dataURLtoFile, toBase64 } from "../utils/utils";

const server = "https://talentdao-api.herokuapp.com";

const EditUserProfile = ({ address }) => {
  const [name, setName] = useState("Edit Name");
  const [bio, setBio] = useState("Edit Bio");
  const [aboutMe, setAboutMe] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tipAddress, setTipAddress] = useState("");
  // const [id, setId] = useState("");
  const [existAuthor, setExistAuthor] = useState(false);
  const [author, setAuthor] = useState(null);
  const [readers, setReaders] = useState("");
  const [timesCited, setTimesCited] = useState(0);
  const [loading, setLoading] = useState(false);

  const [optionTech, setOptionTech] = useState(false);
  const [optionHistory, setOptionHistory] = useState(false);
  const [optionRomance, setOptionRomance] = useState(false);
  const [optionComedy, setOptionComedy] = useState(false);
  const [optionPolitics, setOptionPolitics] = useState(false);

  const [selectedAuthorImage, setselectedAuthorImage] = useState(
    author && author?.authorImage && author?.authorImage?.data !== ""
      ? dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename)
      : "",
  );
  const [selectedCoverImage, setSelectedCoverImage] = useState(
    author && author?.coverImage && author?.coverImage?.data !== ""
      ? dataURLtoFile(author?.coverImage?.data, author?.coverImage?.filename)
      : "",
  );

  const changeSelectedAuthorImage = event => {
    setselectedAuthorImage(event.target.files[0]);
  };

  const changeSelectedCoverImage = event => {
    setSelectedCoverImage(event.target.files[0]);
  };

  useEffect(() => {
    const getAuthorData = async () => {
      const params = new URLSearchParams([["walletId", address]]);
      try {
        const res = await axios.get(server + "/api/authors", { params });
        if (res?.data?.success) {
          setAuthor(res?.data?.data[0]);
          setExistAuthor(true);
        } else {
          setExistAuthor(false);
          setTipAddress(address);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (address === "" || address === undefined) return;
    getAuthorData();
  }, [address]);

  useEffect(() => {
    if (author === null) return;
    setName(author.username);
    setBio(author.bio);
    setAboutMe(author.aboutme);
    setTwitter(author.twitter);
    setLinkedin(author.linkedin);
    setTipAddress(author.walletId);
    setselectedAuthorImage(
      author && author?.authorImage && author?.authorImage?.data !== ""
        ? dataURLtoFile(author?.authorImage?.data, author?.authorImage?.filename)
        : null,
    );
    setSelectedCoverImage(
      author && author?.coverImage && author?.coverImage?.data !== ""
        ? dataURLtoFile(author?.coverImage?.data, author?.coverImage?.filename)
        : null,
    );
    setReaders(author?.readers ? author.readers : "");
    setTimesCited(author && author.times_cited ? author.times_cited : 0);
    // setId(author?._id);

    const popularCategories = author.popularCategories;
    if (popularCategories?.length > 0) {
      popularCategories.forEach(category => {
        if (category === "Technology") {
          setOptionTech(true);
          return;
        }
        if (category === "History") {
          setOptionHistory(true);
          return;
        }
        if (category === "Romance") {
          setOptionRomance(true);
          return;
        }
        if (category === "Comedy") {
          setOptionComedy(true);
          return;
        }
        if (category === "Politics") {
          setOptionPolitics(true);
          return;
        }
      });
    }
  }, [author]);

  useEffect(() => {
    if (name === "") setName("Edit Name");
    if (bio === "") setBio("Edit Bio");
  }, [name, bio]);

  useEffect(() => {
    if (!selectedAuthorImage) return;
    var src = URL.createObjectURL(selectedAuthorImage);
    var userImage = document.getElementById("user-image");
    userImage.src = src;
    userImage.style.display = "block";
  }, [selectedAuthorImage]);

  useEffect(() => {
    if (!selectedCoverImage) return;
    var src = URL.createObjectURL(selectedCoverImage);
    var coverImage = document.getElementById("cover-image");
    coverImage.src = src;
    coverImage.style.display = "block";
  }, [selectedCoverImage]);

  const handleSave = async () => {
    setLoading(true);
    // add categories here
    let popularCategories = [];
    if (optionTech) popularCategories.push("Technology");
    if (optionHistory) popularCategories.push("History");
    if (optionRomance) popularCategories.push("Romance");
    if (optionComedy) popularCategories.push("Comedy");
    if (optionPolitics) popularCategories.push("Politics");

    const authorImage = selectedAuthorImage
      ? {
          filename: selectedAuthorImage.name,
          data: selectedAuthorImage ? await toBase64(selectedAuthorImage) : "",
        }
      : {
          filename: "",
          data: "",
        };

    const authorCoverImage = selectedCoverImage
      ? {
          filename: selectedCoverImage.name,
          data: selectedCoverImage ? await toBase64(selectedCoverImage) : "",
        }
      : {
          filename: "",
          data: "",
        };

    try {
      const data = {
        // id: id,
        username: name,
        bio: bio,
        aboutme: aboutMe,
        twitter: twitter,
        linkedin: linkedin,
        walletId: tipAddress,
        authorImage: authorImage,
        coverImage: authorCoverImage,
        readers: readers,
        times_cited: timesCited,
        popularCategories: popularCategories,
      };
      console.log("TIGER data", data);
      if (existAuthor) {
        const res = await axios.put(server + "/api/author", data);
        console.log("res exist", res);
      } else {
        const res = await axios.post(server + "/api/author", data);
        if (res?.data?.success) setExistAuthor(true);
        console.log("res not", res);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full rounded-2xl bg-white">
        <div className="rounded-2xl h-56 relative" style={{ backgroundColor: "rgba(220, 220, 220, 1)" }}>
          <img
            id="cover-image"
            alt="coverimage"
            className="absolute top-0 left-0 rounded-2xl object-cover w-full h-56"
          ></img>
          <div className="flex flex-row justify-end pr-8 pt-4">
            <label htmlFor="cover-upload" className="rounded-full cursor-pointer z-10">
              <span>
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23C46 35.7025 35.7025 46 23 46ZM23 5.00001C13.0575 5.00001 5.00001 13.06 5.00001 23C5.00001 32.94 13.0575 41 23 41C32.9425 41 41 32.94 41 23C41 13.06 32.9425 5.00001 23 5.00001V5.00001ZM27.5 32.625H18.5V22.4H12.875L23 12.875L33.125 22.4H27.5V32.625Z"
                    fill="#A3A3A3"
                  />
                </svg>
              </span>
              <input
                accept=".jpeg, .png"
                id="cover-upload"
                name="cover-upload"
                type="file"
                className="sr-only"
                onChange={changeSelectedCoverImage}
              />
            </label>
          </div>
        </div>
        <div className="rounded-b-2xl flex flex-col pr-8 pl-12">
          <div className="flex flex-row items-end">
            <div
              className="-mt-20 w-40 h-40 border-2 relative border-white rounded-full flex justify-center items-center overflow-hidden"
              style={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
            >
              <img id="user-image" className="absolute top-0 left-0 rounded-full z-10" alt="user"></img>
              <label htmlFor="image-upload" className="rounded-full cursor-pointer z-10">
                <span>
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23C46 35.7025 35.7025 46 23 46ZM23 5.00001C13.0575 5.00001 5.00001 13.06 5.00001 23C5.00001 32.94 13.0575 41 23 41C32.9425 41 41 32.94 41 23C41 13.06 32.9425 5.00001 23 5.00001V5.00001ZM27.5 32.625H18.5V22.4H12.875L23 12.875L33.125 22.4H27.5V32.625Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </span>
                <input
                  accept=".jpeg, .png"
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  onChange={changeSelectedAuthorImage}
                />
              </label>
            </div>
            <div className="pl-4 flex flex-col text-lightgray text-left space-y-2">
              <div className="text-4xl font-bold">{name}</div>
              <div className="text-sm">{bio}</div>
            </div>
          </div>
          <div className="flex flex-row justify-end space-x-4 pb-4">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill={twitter === "" ? "#A3A3A3" : "#B41C2E"} />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.9796 12.5928C28.2782 13.036 26.1446 14.8289 25.4302 17.2564C25.3071 17.6745 25.2819 17.9227 25.2783 18.7499C25.2759 19.2956 25.297 19.8593 25.3252 20.0025L25.3765 20.263L24.9279 20.2257C22.0112 19.9832 19.6503 19.3754 17.3007 18.262C15.1307 17.2338 12.8697 15.6194 11.4833 14.1083C11.2762 13.8825 11.077 13.7067 11.0408 13.7177C11.0045 13.7287 10.8609 13.9717 10.7215 14.2579C9.77021 16.2101 9.94776 18.4671 11.1905 20.22C11.5543 20.7331 12.1468 21.3393 12.6283 21.691L13.1293 22.0569H12.8577C12.2767 22.0569 11.0617 21.7592 10.4094 21.4571C10.2648 21.3901 10.1223 21.3354 10.0927 21.3354C9.99915 21.3354 10.1229 22.4375 10.2756 22.9645C10.877 25.0403 12.5741 26.6817 14.8279 27.3678C15.202 27.4817 15.4657 27.5895 15.414 27.6076C15.1152 27.7116 14.1334 27.782 13.3709 27.7539L12.5148 27.7223L12.5575 27.8768C12.6302 28.14 13.1191 28.9832 13.4234 29.3703C14.5939 30.8597 16.5048 31.8826 18.3698 32.0183C18.6522 32.0389 18.8831 32.0762 18.8831 32.1013C18.8831 32.203 17.3986 33.0384 16.4906 33.4477C14.4237 34.3793 12.3812 34.7824 9.97604 34.7332L8.75 34.7081L9.09795 34.9065C9.60471 35.1953 11.14 35.8992 11.83 36.1589C15.5444 37.5572 19.881 37.8755 23.9744 37.0505C29.9984 35.8363 34.9542 32.0386 37.4571 26.7184C38.5273 24.4435 39.0642 22.2095 39.1191 19.8022L39.1438 18.7199L39.6232 18.37C40.2364 17.9225 40.9254 17.3263 41.444 16.794C41.8876 16.339 42.5368 15.5533 42.4984 15.5183C42.4852 15.5064 42.2848 15.567 42.0531 15.653C41.1758 15.9784 39.1404 16.4472 38.8362 16.394C38.761 16.3808 38.8154 16.3221 39.0122 16.2038C39.512 15.9035 40.4049 15.0729 40.7843 14.5552C41.1137 14.1057 41.5956 13.2245 41.5978 13.0678C41.5982 13.0346 41.1921 13.1883 40.6952 13.4092C39.7973 13.8086 38.6259 14.1935 37.7078 14.3908L37.2276 14.4939L36.8261 14.1564C35.2758 12.8532 33.0389 12.255 30.9796 12.5928Z"
                fill="white"
              />
            </svg>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill={linkedin === "" ? "#A3A3A3" : "#B41C2E"} />
              <path
                d="M32 13H18C15.239 13 13 15.239 13 18V32C13 34.761 15.239 37 18 37H32C34.762 37 37 34.761 37 32V18C37 15.239 34.762 13 32 13ZM21 32H18V21H21V32ZM19.5 19.732C18.534 19.732 17.75 18.942 17.75 17.968C17.75 16.994 18.534 16.204 19.5 16.204C20.466 16.204 21.25 16.994 21.25 17.968C21.25 18.942 20.467 19.732 19.5 19.732ZM33 32H30V26.396C30 23.028 26 23.283 26 26.396V32H23V21H26V22.765C27.396 20.179 33 19.988 33 25.241V32Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="rounded-2xl flex flex-col px-8 pt-6 pb-8 bg-white space-y-4">
        <div className="flex flex-col">
          <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
            Name <span className="pl-1 text-primary">*</span>
          </label>
          <input
            type="text"
            value={name === "Edit Name" ? "" : name}
            className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-lightgray"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
            Bio <span className="pl-1 text-primary">*</span>
          </label>
          <input
            type="text"
            value={bio === "Edit Bio" ? "" : bio}
            className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-lightgray"
            onChange={event => setBio(event.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
            About Me <span className="pl-1 text-primary">*</span>
          </label>
          <textarea
            rows={4}
            value={aboutMe}
            className="p-4 block w-full bg-transparent text-lg rounded-xl focus:outline-none border border-lightgray"
            onChange={event => setAboutMe(event.target.value)}
          />
        </div>
        <div className="mt-10 col-span-6">
          <div className="pl-4 flex flex-col">
            <label htmlFor="categories" className="block text-left text-lg font-bold">
              Categories
            </label>
            <p className="text-left">Select the category you might be interested in</p>
          </div>
          <div className="mt-1 w-full p-4 text-lg rounded-lg border flex flex-row flex-wrap items-center space-x-4">
            <div
              className={
                optionTech
                  ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                  : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
              }
              style={optionTech ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }}
              onClick={() => setOptionTech(!optionTech)}
            >
              {optionTech && (
                <svg
                  className="mr-2"
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                    fill="#B41C2E"
                  />
                </svg>
              )}
              <div>Technology</div>
            </div>
            <div
              className={
                optionHistory
                  ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                  : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
              }
              style={
                optionHistory ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }
              }
              onClick={() => setOptionHistory(!optionHistory)}
            >
              {optionHistory && (
                <svg
                  className="mr-2"
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                    fill="#B41C2E"
                  />
                </svg>
              )}
              <div>History</div>
            </div>
            <div
              className={
                optionRomance
                  ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                  : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
              }
              style={
                optionRomance ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }
              }
              onClick={() => setOptionRomance(!optionRomance)}
            >
              {optionRomance && (
                <svg
                  className="mr-2"
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                    fill="#B41C2E"
                  />
                </svg>
              )}
              <div>Romance</div>
            </div>
            <div
              className={
                optionComedy
                  ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                  : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
              }
              style={optionComedy ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }}
              onClick={() => setOptionComedy(!optionComedy)}
            >
              {optionComedy && (
                <svg
                  className="mr-2"
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                    fill="#B41C2E"
                  />
                </svg>
              )}
              <div>Comedy</div>
            </div>
            <div
              className={
                optionPolitics
                  ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                  : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
              }
              style={
                optionPolitics ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }
              }
              onClick={() => setOptionPolitics(!optionPolitics)}
            >
              {optionPolitics && (
                <svg
                  className="mr-2"
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                    fill="#B41C2E"
                  />
                </svg>
              )}
              <div>Politics</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
          On The Web
        </label>
        <div className="rounded-2xl border border-lightgray p-4 flex flex-col">
          <div className="flex flex-row items-center">
            <div className="w-56  flex flex-row items-center">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill={twitter === "" ? "#A3A3A3" : "#B41C2E"} />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.9796 12.5928C28.2782 13.036 26.1446 14.8289 25.4302 17.2564C25.3071 17.6745 25.2819 17.9227 25.2783 18.7499C25.2759 19.2956 25.297 19.8593 25.3252 20.0025L25.3765 20.263L24.9279 20.2257C22.0112 19.9832 19.6503 19.3754 17.3007 18.262C15.1307 17.2338 12.8697 15.6194 11.4833 14.1083C11.2762 13.8825 11.077 13.7067 11.0408 13.7177C11.0045 13.7287 10.8609 13.9717 10.7215 14.2579C9.77021 16.2101 9.94776 18.4671 11.1905 20.22C11.5543 20.7331 12.1468 21.3393 12.6283 21.691L13.1293 22.0569H12.8577C12.2767 22.0569 11.0617 21.7592 10.4094 21.4571C10.2648 21.3901 10.1223 21.3354 10.0927 21.3354C9.99915 21.3354 10.1229 22.4375 10.2756 22.9645C10.877 25.0403 12.5741 26.6817 14.8279 27.3678C15.202 27.4817 15.4657 27.5895 15.414 27.6076C15.1152 27.7116 14.1334 27.782 13.3709 27.7539L12.5148 27.7223L12.5575 27.8768C12.6302 28.14 13.1191 28.9832 13.4234 29.3703C14.5939 30.8597 16.5048 31.8826 18.3698 32.0183C18.6522 32.0389 18.8831 32.0762 18.8831 32.1013C18.8831 32.203 17.3986 33.0384 16.4906 33.4477C14.4237 34.3793 12.3812 34.7824 9.97604 34.7332L8.75 34.7081L9.09795 34.9065C9.60471 35.1953 11.14 35.8992 11.83 36.1589C15.5444 37.5572 19.881 37.8755 23.9744 37.0505C29.9984 35.8363 34.9542 32.0386 37.4571 26.7184C38.5273 24.4435 39.0642 22.2095 39.1191 19.8022L39.1438 18.7199L39.6232 18.37C40.2364 17.9225 40.9254 17.3263 41.444 16.794C41.8876 16.339 42.5368 15.5533 42.4984 15.5183C42.4852 15.5064 42.2848 15.567 42.0531 15.653C41.1758 15.9784 39.1404 16.4472 38.8362 16.394C38.761 16.3808 38.8154 16.3221 39.0122 16.2038C39.512 15.9035 40.4049 15.0729 40.7843 14.5552C41.1137 14.1057 41.5956 13.2245 41.5978 13.0678C41.5982 13.0346 41.1921 13.1883 40.6952 13.4092C39.7973 13.8086 38.6259 14.1935 37.7078 14.3908L37.2276 14.4939L36.8261 14.1564C35.2758 12.8532 33.0389 12.255 30.9796 12.5928Z"
                  fill="white"
                />
              </svg>
              <div className="pl-2 text-lg font-bold">Twitter</div>
            </div>
            <input
              type="text"
              value={twitter}
              className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-lightgray"
              onChange={event => setTwitter(event.target.value)}
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="w-56 flex flex-row items-center">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill={linkedin === "" ? "#A3A3A3" : "#B41C2E"} />
                <path
                  d="M32 13H18C15.239 13 13 15.239 13 18V32C13 34.761 15.239 37 18 37H32C34.762 37 37 34.761 37 32V18C37 15.239 34.762 13 32 13ZM21 32H18V21H21V32ZM19.5 19.732C18.534 19.732 17.75 18.942 17.75 17.968C17.75 16.994 18.534 16.204 19.5 16.204C20.466 16.204 21.25 16.994 21.25 17.968C21.25 18.942 20.467 19.732 19.5 19.732ZM33 32H30V26.396C30 23.028 26 23.283 26 26.396V32H23V21H26V22.765C27.396 20.179 33 19.988 33 25.241V32Z"
                  fill="white"
                />
              </svg>
              <div className="pl-2 text-lg font-bold">Linkedin</div>
            </div>
            <input
              type="text"
              value={linkedin}
              className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-lightgray"
              onChange={event => setLinkedin(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
          Tip Address <span className="pl-1 text-primary">*</span>
        </label>
        <input
          type="text"
          value={tipAddress}
          className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-lightgray"
          onChange={event => setTipAddress(event.target.value)}
        />
      </div>
      <Spin spinning={loading} />
      <div className="flex items-center justify-center">
        <div
          className="mt-4 px-8 py-2 rounded-full bg-primary text-white text-lg w-56 cursor-pointer"
          onClick={handleSave}
        >
          SAVE
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
