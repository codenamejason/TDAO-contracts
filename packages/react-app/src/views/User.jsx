import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EditUserProfile,
  Notifications,
  PublisherPage,
  UserArticles,
  UserConnect,
  UserSubmissions,
} from "../components/HelperComponents";
import { useAccount } from "wagmi";

const configUserType = {
  none: -1,
  submission: 0,
  article: 1,
  edit_profile: 2,
  logout: 3,
  notifications: 4,
  publisher: 5,
};

export default function User({ userMenuOpen, handleUserMenuOpen }) {
  const [menuOpen, setMenuOpen] = useState(userMenuOpen);
  const [userConfig, setUserConfig] = useState(configUserType.none);
  const location = useLocation();
  const navigate = useNavigate();

  const { address } = useAccount();

  const handleMenuOpen = () => {
    setMenuOpen(false);
    handleUserMenuOpen(false);
  };

  const handleConfigTypeChanged = type => {
    if (type === configUserType.submission) {
      navigate("/user/submissions");
    } else if (type == configUserType.article) {
      navigate("/user/articles");
    } else if (type == configUserType.edit_profile) {
      navigate("/user/author");
    } else if (type == configUserType.notifications) {
      navigate("/user/notifications");
    } else if (type == configUserType.publisher) {
      navigate("/user/publisher");
    }

    handleMenuOpen();
  };

  useEffect(() => {
    if (address === undefined) {
      setUserConfig(configUserType.none);
    } else {
      if (location.pathname.includes("/submissions")) setUserConfig(configUserType.submission);
      else if (location.pathname.includes("/articles")) setUserConfig(configUserType.article);
      else if (location.pathname.includes("/author")) setUserConfig(configUserType.edit_profile);
      else if (location.pathname.includes("/notifications")) setUserConfig(configUserType.notifications);
      else if (location.pathname.includes("/publisher")) setUserConfig(configUserType.publisher);
      else setUserConfig(configUserType.submission);
    }
  }, [address]);

  useEffect(() => {
    if (location.pathname.includes("/submissions")) setUserConfig(configUserType.submission);
    else if (location.pathname.includes("/articles")) setUserConfig(configUserType.article);
    else if (location.pathname.includes("/author")) {
      setUserConfig(configUserType.edit_profile);
    } else if (location.pathname.includes("/notifications")) setUserConfig(configUserType.notifications);
    else if (location.pathname.includes("/publisher")) setUserConfig(configUserType.publisher);
  }, [location.pathname, address]);

  const Menu = () => (
    <>
      <div className="pl-8 pr-2 py-2 lg:hidden flex flex-row items-center justify-between text-lg text-primary">
        <div>Connect</div>
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleMenuOpen}
        >
          <path
            d="M14.4785 6.9L11.5 9.8785L8.5215 6.9L6.9 8.5215L9.8785 11.5L6.9 14.4785L8.5215 16.1L11.5 13.1215L14.4785 16.1L16.1 14.4785L13.1215 11.5L16.1 8.5215L14.4785 6.9ZM11.5 0C5.1405 0 0 5.1405 0 11.5C0 17.8595 5.1405 23 11.5 23C17.8595 23 23 17.8595 23 11.5C23 5.1405 17.8595 0 11.5 0ZM11.5 20.7C6.4285 20.7 2.3 16.5715 2.3 11.5C2.3 6.4285 6.4285 2.3 11.5 2.3C16.5715 2.3 20.7 6.4285 20.7 11.5C20.7 16.5715 16.5715 20.7 11.5 20.7Z"
            fill="#656565"
          />
        </svg>
      </div>
      <div
        className="rounded-md bg-transparent hover:bg-gray px-8 py-2 flex flex-row items-center cursor-pointer text-lg"
        onClick={() => handleConfigTypeChanged(configUserType.submission)}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="pr-3">
          <path
            d="M17.5 0C7.84 0 0 7.84 0 17.5C0 27.16 7.84 35 17.5 35C27.16 35 35 27.16 35 17.5C35 7.84 27.16 0 17.5 0ZM20.79 16.695L12.11 25.375L9.6425 22.9075L18.3225 14.2275L14.595 10.5L24.4825 10.5175L24.5 20.405L20.79 16.695Z"
            fill={
              userConfig === configUserType.submission || userConfig === configUserType.publisher
                ? "#B41C2E"
                : "#929292"
            }
          />
        </svg>
        <div
          className={
            userConfig === configUserType.submission || userConfig === configUserType.publisher
              ? "text-primary"
              : "text-lightgray"
          }
        >
          Submissions
        </div>
      </div>
      <div
        className="rounded-md bg-transparent hover:bg-gray px-8 py-2 flex flex-row items-center cursor-pointer text-lg"
        onClick={() => handleConfigTypeChanged(configUserType.article)}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="pr-3">
          <path
            d="M3.5 7H0V31.5C0 33.425 1.575 35 3.5 35H28V31.5H3.5V7ZM31.5 0H10.5C8.575 0 7 1.575 7 3.5V24.5C7 26.425 8.575 28 10.5 28H31.5C33.425 28 35 26.425 35 24.5V3.5C35 1.575 33.425 0 31.5 0ZM29.75 15.75H12.25V12.25H29.75V15.75ZM22.75 22.75H12.25V19.25H22.75V22.75ZM29.75 8.75H12.25V5.25H29.75V8.75Z"
            fill={userConfig === configUserType.article ? "#B41C2E" : "#929292"}
          />
        </svg>
        <div className={userConfig === configUserType.article ? "text-primary" : "text-lightgray"}>Papers</div>
      </div>
      <div
        className="rounded-md bg-transparent hover:bg-gray px-8 py-2 flex flex-row items-center cursor-pointer text-lg"
        onClick={() => handleConfigTypeChanged(configUserType.notifications)}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="pr-3">
          <path
            d="M3.5 7H0V31.5C0 33.425 1.575 35 3.5 35H28V31.5H3.5V7ZM31.5 0H10.5C8.575 0 7 1.575 7 3.5V24.5C7 26.425 8.575 28 10.5 28H31.5C33.425 28 35 26.425 35 24.5V3.5C35 1.575 33.425 0 31.5 0ZM29.75 15.75H12.25V12.25H29.75V15.75ZM22.75 22.75H12.25V19.25H22.75V22.75ZM29.75 8.75H12.25V5.25H29.75V8.75Z"
            fill={userConfig === configUserType.notifications ? "#B41C2E" : "#929292"}
          />
        </svg>
        <div className={userConfig === configUserType.notifications ? "text-primary" : "text-lightgray"}>
          Notifications
        </div>
      </div>
      <div
        className="rounded-md bg-transparent hover:bg-gray px-8 py-2 flex flex-row items-center cursor-pointer text-lg"
        onClick={() => handleConfigTypeChanged(configUserType.edit_profile)}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="pr-3">
          <path
            d="M0 27.7093V35H7.29065L28.7932 13.4974L21.5026 6.20678L0 27.7093ZM34.4313 7.85932C35.1896 7.1011 35.1896 5.87627 34.4313 5.11804L29.882 0.568671C29.1237 -0.189557 27.8989 -0.189557 27.1407 0.568671L23.5828 4.12651L30.8735 11.4172L34.4313 7.85932Z"
            fill={userConfig === configUserType.edit_profile ? "#B41C2E" : "#929292"}
          />
        </svg>
        <div className={userConfig === configUserType.edit_profile ? "text-primary" : "text-lightgray"}>Profile</div>
      </div>
      <div
        className="rounded-md bg-transparent hover:bg-gray px-8 py-2 flex flex-row items-center cursor-pointer text-lg"
        onClick={() => handleConfigTypeChanged(configUserType.logout)}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="pr-3">
          <path
            d="M21.2487 10.6663H19.7904V7.74967C19.7904 3.72467 16.5237 0.458008 12.4987 0.458008C8.4737 0.458008 5.20703 3.72467 5.20703 7.74967V10.6663H3.7487C2.14453 10.6663 0.832031 11.9788 0.832031 13.583V28.1663C0.832031 29.7705 2.14453 31.083 3.7487 31.083H21.2487C22.8529 31.083 24.1654 29.7705 24.1654 28.1663V13.583C24.1654 11.9788 22.8529 10.6663 21.2487 10.6663ZM12.4987 23.7913C10.8945 23.7913 9.58203 22.4788 9.58203 20.8747C9.58203 19.2705 10.8945 17.958 12.4987 17.958C14.1029 17.958 15.4154 19.2705 15.4154 20.8747C15.4154 22.4788 14.1029 23.7913 12.4987 23.7913ZM17.0195 10.6663H7.97786V7.74967C7.97786 5.25592 10.0049 3.22884 12.4987 3.22884C14.9924 3.22884 17.0195 5.25592 17.0195 7.74967V10.6663Z"
            fill={userConfig === configUserType.logout ? "#B41C2E" : "#929292"}
          />
        </svg>
        <div className={userConfig === configUserType.logout ? "text-primary" : "text-lightgray"}>Log Out</div>
      </div>
    </>
  );

  return (
    <>
      <div className="py-8 px-4 sm:px-8 md:px-10 xl:px-20 overflow-hidden bg-gray">
        <div className="relative flex flex-row gap-8">
          {userMenuOpen && (
            <>
              <div className="absolute z-10">
                <div id="overlay"></div>
              </div>
              <div className="absolute z-20 lg:hidden top-0 -left-8 flex flex-col rounded-r-xl bg-white px-4 py-10 h-full space-y-4 pb-10">
                <Menu />
              </div>
            </>
          )}
          <div className="hidden lg:flex flex-col rounded-xl bg-white px-4 py-10 space-y-4 h-screen">
            <Menu />
          </div>
          <div className="w-full">
            {userConfig === configUserType.none ? (
              <div className="flex justify-center">
                <UserConnect></UserConnect>
              </div>
            ) : userConfig === configUserType.submission ? (
              <div className="flex flex-col">
                <UserSubmissions address={address}></UserSubmissions>
              </div>
            ) : userConfig === configUserType.article ? (
              <div className="flex flex-col">
                <p className="py-4 text-left text-lg text-darkgray font-bold">Articles</p>
                <UserArticles address={address}></UserArticles>
              </div>
            ) : userConfig === configUserType.edit_profile ? (
              <div className="flex flex-col">
                <p className="py-4 text-left text-lg text-darkgray font-bold">Edit Profile</p>
                <EditUserProfile address={address}></EditUserProfile>
              </div>
            ) : userConfig === configUserType.notifications ? (
              <div className="flex flex-col">
                <Notifications />
              </div>
            ) : userConfig === configUserType.publisher ? (
              <div className="flex flex-col">
                <PublisherPage />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
