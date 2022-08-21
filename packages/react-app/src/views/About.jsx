import React, { useEffect } from "react";
import aboutImage from "../assets/about.png";
import abstract from "../assets/abstract.png";
import BlueTechBanner from "../assets/BlueTechBanner.png";
import know from "../assets/know.png";
import lineImage from "../assets/line.png";
import people_at from "../assets/people_at.png";
import tradition from "../assets/tradition.png";
import { Footer } from "../components";

const About = () => {
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

  return (
    <div style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="mt-4 md:mt-8 mx-auto max-w-xl md:max-w-4xl xl:max-w-7xl overflow-hidden">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-4xl text-primary font-bold">
            The world of work <br /> just got so much better
          </div>
          <img src={aboutImage} className="hidden lg:flex w-1/2 pt-4" alt="about"></img>
          <div className="mx-4 md:mx-0 pt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col items-start space-y-4">
              <div className="text-lg text-primary">MISSION</div>
              <div className="text-3xl lg:text-6xl font-bold text-left">What We Do</div>
              <img src={lineImage} alt="line"></img>
              <div className="text-left text-lg">
                To unlock human potential in the decentralized, digital economy. We conduct scientific research that
                helps DAOs thrive while educating the public on the greater decency and agency offered from this
                decentralized future of work.
              </div>
            </div>
            <img src={abstract} alt="abstract"></img>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-lg text-primary">BELIEFS</div>
            <div className="text-3xl lg:text-6xl font-bold">Why We Do It</div>
            <div className="mx-4 md:mx-0 grid grid-cols-1 lg:grid-cols-3 space-x-0 lg:space-x-8 space-y-4 lg:space-y-0 my-10 text-left">
              <div
                className="bg-white rounded-xl p-8 flex flex-col space-y-4"
                style={{ boxShadow: "0px 0px 20px -4px rgba(0, 0, 0, 0.19)" }}
              >
                <img src={people_at} width={70} alt="people at"></img>
                <div className="text-lg font-bold">People should have the freedom to work how and when they want</div>
                <div className="text-lg">Without Relying On Institutions Or Third Parties For Their Livelihood.</div>
              </div>
              <div
                className="bg-white rounded-xl p-8 flex flex-col space-y-4"
                style={{ boxShadow: "0px 0px 20px -4px rgba(0, 0, 0, 0.19)" }}
              >
                <img src={tradition} width={70} alt="tradition"></img>
                <div className="text-lg font-bold">
                  Traditional and Hierarchal Approaches to work have led to Human Coordination failures
                </div>
                <div className="text-lg">
                  These Coordination failures can not be repaired within our current work paradigms
                </div>
              </div>
              <div
                className="bg-white rounded-xl p-8 flex flex-col space-y-4"
                style={{ boxShadow: "0px 0px 20px -4px rgba(0, 0, 0, 0.19)" }}
              >
                <img src={know} width={70} alt="know"></img>
                <div className="text-lg font-bold">Knowledge should be Open Source</div>
                <div className="text-lg">
                  Traditional researchers are forced to operate in a closed source universe because they are
                  incentivized to publish or perish. This is unacceptable. At talentDAO we are creating mechanisms to
                  incentivize open-source publications.
                </div>
              </div>
            </div>

            <div className="rounded-3xl relative overflow-hidden">
              <img
                alt="blue tech banner"
                className="absolute top-0 left-0 w-full h-full"
                src={BlueTechBanner}
                style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
              ></img>
              <div className="relative flex flex-col items-center space-y-6 py-10">
                <div className="text-3xl lg:text-6xl font-bold text-white">Want to Join us?</div>
                <div className="text-lg text-white">
                  We are a new generation of researchers building the world's first decentralized community-reviewed
                  publication protocol for the social sciences.
                </div>
                <div className="rounded-full px-4 py-2 bg-primary text-white">GET STARTED</div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mx-0">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default About;
