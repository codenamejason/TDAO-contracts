import handImage from "../assets/hand.png";
import stepImage from "../assets/step.png";
import technologyDataImage from "../assets/technology-data.png";

function Newsletter() {
  return (
    // <div className="newsletter" style={{background: 'linear-gradient(90deg, #090909 0%, #3F040B 100%)'}}>
    // </div>

    <div className="demo-wrap rounded-3xl p-6 lg:p-16">
      <img className="demo-bg" src={technologyDataImage} alt="" />
      <div className="relative flex flex-col lg:flex-row justify-between items-center space-x-0 lg:space-x-4">
        <img className="md:w-1/2 md:h-1/2" src={stepImage} alt="step"></img>
        <div className="flex flex-col justify-center text-right">
          <div className="text-4xl text-white font-bold pt-4">Sign up for the updates</div>
          <div className="pt-4 text-lg text-lightgray">
            We’ll keep you up to date with our latest news, announcements, and development plans
          </div>
          <span className="pt-2 text-white text-lg font-bold">No-spam policy!</span>
          <div className="pt-4 flex flex-row items-center">
            <input
              type="search"
              name="query"
              className="flex-1 h-10 px-4 m-1 text-lg text-gray-700 placeholder-gray-400 bg-white rounded-xl border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              placeholder="Email Address"
              required=""
            />
            <div className="ml-2 rounded-xl bg-primary px-4 py-2">
              <img width={32} src={handImage} alt="hand"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
