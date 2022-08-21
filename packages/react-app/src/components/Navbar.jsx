import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import discord from "../assets/discord.png";
import divideImage from "../assets/divide.png";
import menuImage from "../assets/menu.png";
import menuIconImage from "../assets/menu_icon.png";
import profile from "../assets/profile.png";
import logo from "../assets/talent-logo.png";
import twitterImg from "../assets/twitter.png";
import { getAuthorData } from "../utils/utils";

function Navbar({ userMenuOpen, handleUserMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { address } = useAccount();

  const [show, setShow] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(userMenuOpen);
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const goToPage = locationPath => {
    setShow(false);
    setNavPanelOpen(false);
    navigate(locationPath);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
    handleUserMenuOpen(true);
  };

  const handleBrowseByAuthor = () => {
    goToPage("/browse");
  };

  const handleBrowseBySubject = () => {
    goToPage("/browse");
  };

  useEffect(() => {
    if (address === undefined || address === "") return;
    const params = new URLSearchParams([["walletId", address]]);
    const data = getAuthorData(params);
    if (data !== null) {
      setTwitter(data.twitter);
    }
  }, [address]);

  return (
    <div
      className="relative bg-white border-b"
      style={{ position: "sticky", top: "0", zIndex: "2", borderColor: "#c1c1c1" }}
    >
      <nav className="mx-4 sm:mx-8 md:mx-10 xl:mx-20 flex flex-row items-center justify-between">
        {/* Navbar Left Items */}
        {location.pathname.includes("/user") && (
          <img className="xl:hidden" alt="menu" src={menuImage} onClick={handleMenuOpen}></img>
        )}
        <div className="flex items-center py-5">
          <img
            className="cursor-pointer"
            src={logo}
            alt="Talent DAO Logo"
            layout="fixed"
            onClick={() => goToPage("/")}
          />
          <div className="hidden xl:flex items-center">
            <img className="px-8" src={divideImage} alt="div"></img>
            <div className="flex items-center space-x-7">
              <div
                onClick={() => goToPage("/")}
                className={
                  location.pathname === "/"
                    ? "text-lg text-primary font-semibold cursor-pointer"
                    : "text-lg cursor-pointer"
                }
              >
                HOME
              </div>
              <div
                onClick={() => goToPage("/about")}
                className={
                  location.pathname === "/about"
                    ? "text-lg text-primary font-semibold cursor-pointer"
                    : "text-lg cursor-pointer"
                }
              >
                ABOUT
              </div>
              <div
                onClick={() => goToPage("/contact")}
                className={
                  location.pathname === "/contact"
                    ? "text-lg text-primary font-semibold cursor-pointer whitespace-nowrap"
                    : "text-lg whitespace-nowrap cursor-pointer"
                }
              >
                CONTACT US
              </div>
              <div className="relative">
                <div
                  className={
                    location.pathname === "/browse"
                      ? "text-lg text-primary font-semibold cursor-pointer"
                      : "text-lg cursor-pointer"
                  }
                  onClick={() => setShow(!show)}
                >
                  BROWSE
                  {/* <div>
                    {
                      show ? (
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z" fill="#1F2937" />
                        </svg>
                      ) : (
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z" fill="#1F2937" />
                        </svg>
                      )
                    }
                  </div> */}
                </div>
                {show && (
                  <div
                    className="origin-top-right absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div className="py-1" role="none">
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-lightgray"
                        onClick={handleBrowseByAuthor}
                      >
                        Browse by Author
                      </div>
                      <div
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-lightgray"
                        onClick={handleBrowseBySubject}
                      >
                        Browse by Subject
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <div onClick={() => goToPage("/author")} className={location.pathname === '/author' ? 'text-lg text-primary font-semibold cursor-pointer' : 'text-lg cursor-pointer'}>Author</div>
              <div onClick={() => goToPage("/article")} className={location.pathname === '/article' ? 'text-lg text-primary font-semibold cursor-pointer' : 'text-lg cursor-pointer'}>Article</div> */}
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-end space-x-16">
          <div className="flex space-x-8">
            <a href={twitter}>
              <img src={twitterImg} alt="twitter logo" width={40} height={40} layout="fixed" />
            </a>
            <img src={discord} alt="discord logo" width={40} height={40} layout="fixed" />
            <img
              onClick={() => goToPage("/user/author")}
              className="cursor-pointer"
              src={profile}
              alt="profile icon"
              width={40}
              height={40}
              layout="fixed"
            />
          </div>
          <ConnectButton />
        </div>
        <div className="xl:hidden" onClick={() => setNavPanelOpen(!navPanelOpen)}>
          <img src={menuIconImage} alt="menu icon" width={40} height={40} layout="fixed" />
        </div>
      </nav>

      {navPanelOpen && (
        <div className="absolute top-25 w-full h-screen bg-white flex flex-col py-4 px-4 sm:px-8">
          <div className="flex flex-col space-y-4 text-left">
            <div
              onClick={() => goToPage("/")}
              className={
                location.pathname === "/"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              HOME
            </div>
            <div
              onClick={() => goToPage("/about")}
              className={
                location.pathname === "/about"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              ABOUT
            </div>
            <div
              onClick={() => goToPage("/contact")}
              className={
                location.pathname === "/contact"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              CONTACT US
            </div>
            <div
              onClick={() => goToPage("/browse")}
              className={
                location.pathname === "/browse"
                  ? "text-lg text-primary font-semibold cursor-pointer"
                  : "text-lg cursor-pointer"
              }
            >
              BROWSE
            </div>
            {/* <div onClick={() => goToPage("/author")} className={location.pathname === '/author' ? 'text-lg text-primary font-semibold cursor-pointer' : 'text-lg cursor-pointer'}>Author</div>
              <div onClick={() => goToPage("/article")} className={location.pathname === '/article' ? 'text-lg text-primary font-semibold cursor-pointer' : 'text-lg cursor-pointer'}>Article</div> */}
          </div>
          <div className="pt-4 flex flex-row items-center space-x-4">
            <a href={twitter}>
              <img src={twitterImg} alt="twitter logo" width={40} height={40} layout="fixed" />
            </a>
            <img className="cursor-pointer" src={discord} alt="discord logo" width={40} height={40} layout="fixed" />
            <img
              onClick={() => goToPage("/user/author")}
              className="cursor-pointer"
              src={profile}
              alt="profile icon"
              width={40}
              height={40}
              layout="fixed"
            />
          </div>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}

export default Navbar;
