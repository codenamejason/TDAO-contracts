import { useNavigate } from "react-router-dom";
import earthImage from "../assets/earth.png";
import earth_mobileImage from "../assets/earth_mobile.png";
import searchImage from "../assets/search.svg";
import vector from "../assets/Vector.png";

/* This example requires Tailwind CSS v2.0+ */
export default function Splash({ address }) {
  const navigate = useNavigate();
  return (
    <div
      className="mx-4 relative flex flex-col lg:flex-row place-content-between items-center rounded-3xl"
      style={{ background: "linear-gradient(100.23deg, #0037B5 3.84%, #B41C2E 108.44%)" }}
    >
      <img src={earth_mobileImage} alt="earth mobile" className="lg:hidden w-full mix-blend-screen px-10 z-0"></img>
      <div className="z-1 flex flex-col text-left mt-4 lg:mt-32 mb-20 ml-0 lg:ml-16">
        <div
          className="text-white font-bold text-4xl md:text-6xl lg:text-8xl items-center"
          style={{ color: "#ffffff" }}
        >
          Journal of
        </div>
        <div className="text-white font-bold text-4xl md:text-6xl lg:text-8xl items-center">Decentralized Work</div>
        <div className="pt-10 lg:pt-16 flex flex-col lg:flex-row lg:items-center">
          <div className="w-72 border rounded-lg border-primary focus-within:border-primary focus-within:ring-primary focus-within:ring-opacity-40 bg-white">
            <form action="/search" className="flex flex-row items-center">
              <input
                type="search"
                name="query"
                className="h-10 pl-2 text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
                placeholder="Articles, journals, documents..."
                required=""
              />
              <button
                type="submit"
                className="w-8 h-8 flex items-center justify-center p-2 m-1 text-white transition-colors duration-200 transform rounded-md lg:w-12 lg:h-12 lg:p-2 bg-primary hover:bg-opacity-80 focus:outline-none focus:bg-teal-300"
              >
                <img src={searchImage}></img>
              </button>
            </form>
          </div>
          <div
            className="w-72 my-4 lg:my-0 mx-0 lg:mx-4 py-3 flex flex-row items-center justify-between bg-primary hover:bg-opacity-80 rounded-lg text-white cursor-pointer"
            onClick={() => navigate(`/submit/${address}`)}
          >
            <div className="text-lg font-bold px-4">SUBMIT ARTICLE</div>
            <img src={vector} className="w-10 pr-2"></img>
          </div>
        </div>
      </div>
      <img src={earthImage} className="absolute top-0 right-0 hidden lg:block mix-blend-screen pr-8"></img>
    </div>
  );
}
