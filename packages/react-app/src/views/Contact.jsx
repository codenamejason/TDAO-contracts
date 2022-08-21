import axios from "axios";
import React, { useEffect, useState } from "react";
import contact_join_us from "../assets/contact_join_us.png";
import contact_rect from "../assets/contact_rect.png";
import faqArrow from "../assets/faqArrow.png";
import lineImage from "../assets/line.png";
import { Footer } from "../components";

const FAQStateType = {
  none: "",
  first: "What is TalentDAO",
  second: "Who uses TalentDAO",
  third: "What is TalentDAO?",
  fourth: "Who uses TalentDAO?",
};

const Contact = () => {
  const scrollTop = () => {
    document.documentElement.scrollTo({
      // @ts-ignore
      top: 0,
      behavior: "smooth",
    });
  };

  const [FAQState, setFAQState] = useState(FAQStateType.none);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [requiredName, setRequiredName] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredMessage, setRequiredMessage] = useState(false);

  const submit = async () => {
    if (name === "") setRequiredName(true);
    else setRequiredName(false);

    if (email === "") setRequiredEmail(true);
    else setRequiredEmail(false);

    if (message === "") setRequiredMessage(true);
    else setRequiredMessage(false);

    if (name === "" || email === "" || message === "") return;

    try {
      const server = "https://talentdao-api.herokuapp.com";
      const res = axios.post(server + "/api/contact", {
        name: name,
        email: email,
        link: link,
        subject: subject,
        message: message,
      });

      console.log("res: ", res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="flex flex-col" style={{ backgroundImage: "linear-gradient(#fff, #EEE" }}>
      <div className="relative">
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={contact_rect}
          style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
        ></img>
        <div className="mx-4 sm:mx-8 md:mx-10 xl:mx-20 overflow-hidden relative flex flex-col items-start text-left text-white space-y-8 py-16">
          <div className="text-6xl font-bold">Get in touch</div>
          <div>
            There are many reasons to connect. Want to hear about a project?
            <br /> Discuss a project of your own? Looking to learn more?
            <br />
            We'd love to hear from you.{" "}
          </div>
          <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-8">
            <div className="rounded-full bg-primary px-10 py-4 cursor-pointer">MESSAGE</div>
            <div
              className="rounded-full px-10 py-4 cursor-pointer"
              style={{ backgroundColor: "rgba(180, 28, 46, 0.15)" }}
            >
              DISCORD
            </div>
          </div>
        </div>
      </div>
      <div className="mx-0 sm:mx-8 md:mx-10 xl:mx-20 overflow-hidden">
        <div className="px-4 py-8 mx-auto max-w-xl md:max-w-4xl xl:max-w-7xl flex flex-col space-y-8">
          <div className="flex flex-col space-y-8">
            <div className="text-2xl font-bold">FAQs</div>
            <div
              className="rounded-xl p-4 text-lg text-darkgray flex flex-col"
              style={{ boxShadow: "0px 4px 12px rgba(204, 204, 204, 0.61)" }}
            >
              <div className="flex flex-row items-center justify-between">
                <div>{FAQStateType.first}</div>
                <img
                  src={faqArrow}
                  className="cursor-pointer"
                  onClick={() =>
                    FAQState != FAQStateType.first ? setFAQState(FAQStateType.first) : setFAQState(FAQStateType.none)
                  }
                ></img>
              </div>
              {FAQState === FAQStateType.first && (
                <div className="py-2 text-left">
                  By submitting this form you consent to us emailing you occasionally about our product and community.
                  You can unsubscribe from emails at any time, and we will never pass your email onto third parties.
                </div>
              )}
            </div>
            <div
              className="rounded-xl p-4 text-lg text-darkgray flex flex-col"
              style={{ boxShadow: "0px 4px 12px rgba(204, 204, 204, 0.61)" }}
            >
              <div className="flex flex-row items-center justify-between">
                <div>{FAQStateType.second}</div>
                <img
                  src={faqArrow}
                  className="cursor-pointer"
                  onClick={() =>
                    FAQState != FAQStateType.second ? setFAQState(FAQStateType.second) : setFAQState(FAQStateType.none)
                  }
                ></img>
              </div>
              {FAQState === FAQStateType.second && (
                <div className="py-2 text-left">
                  By submitting this form you consent to us emailing you occasionally about our product and community.
                  You can unsubscribe from emails at any time, and we will never pass your email onto third parties.
                </div>
              )}
            </div>
            <div
              className="rounded-xl p-4 text-lg text-darkgray flex flex-col"
              style={{ boxShadow: "0px 4px 12px rgba(204, 204, 204, 0.61)" }}
            >
              <div className="flex flex-row items-center justify-between">
                <div>{FAQStateType.third}</div>
                <img
                  src={faqArrow}
                  className="cursor-pointer"
                  onClick={() =>
                    FAQState != FAQStateType.third ? setFAQState(FAQStateType.third) : setFAQState(FAQStateType.none)
                  }
                ></img>
              </div>
              {FAQState === FAQStateType.third && (
                <div className="py-2 text-left">
                  By submitting this form you consent to us emailing you occasionally about our product and community.
                  You can unsubscribe from emails at any time, and we will never pass your email onto third parties.
                </div>
              )}
            </div>
            <div
              className="rounded-xl p-4 text-lg text-darkgray flex flex-col"
              style={{ boxShadow: "0px 4px 12px rgba(204, 204, 204, 0.61)" }}
            >
              <div className="flex flex-row items-center justify-between">
                <div>{FAQStateType.fourth}</div>
                <img
                  src={faqArrow}
                  className="cursor-pointer"
                  onClick={() =>
                    FAQState != FAQStateType.fourth ? setFAQState(FAQStateType.fourth) : setFAQState(FAQStateType.none)
                  }
                ></img>
              </div>
              {FAQState === FAQStateType.fourth && (
                <div className="py-2 text-left">
                  By submitting this form you consent to us emailing you occasionally about our product and community.
                  You can unsubscribe from emails at any time, and we will never pass your email onto third parties.
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start space-y-4">
                <div className="text-2xl font-bold">Still got a message for us?</div>
                <img src={lineImage}></img>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 space-x-0 lg:space-x-8 text-left">
              <div className="flex flex-col">
                <div className="flex flex-col my-4">
                  <div className="text-lg text-left px-4 py-2">
                    Name <span className="text-primary">*</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="px-4 py-2 text-lg bg-transparent rounded-xl border border-gray appearance-none lg:h-12 focus:outline-none focus:placeholder-transparent focus:ring-0"
                    placeholder="e.g John Doe"
                    required=""
                  />
                  {requiredName && <div className="pt-2 pl-4 text-primary text-sm">This field should be required.</div>}
                </div>
                <div className="flex flex-col my-4">
                  <div className="text-lg text-left px-4 py-2">Link</div>
                  <input
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    className="px-4 py-2 text-lg bg-transparent rounded-xl border border-gray appearance-none lg:h-12 focus:outline-none focus:placeholder-transparent focus:ring-0"
                    placeholder="link to article or resource"
                    required=""
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col my-4">
                  <div className="text-lg text-left px-4 py-2">
                    Email Address <span className="text-primary">*</span>
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="px-4 py-2 text-lg bg-transparent rounded-xl border border-gray appearance-none lg:h-12 focus:outline-none focus:placeholder-transparent focus:ring-0"
                    placeholder="e.g  Johndoe@xyz.com"
                    required=""
                  />
                  {requiredEmail && (
                    <div className="pt-2 pl-4 text-primary text-sm">This field should be required.</div>
                  )}
                </div>
                <div className="flex flex-col my-4">
                  <div className="text-lg text-left px-4 py-2">Select Subject</div>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="px-4 py-2 text-lg bg-transparent rounded-xl border border-gray appearance-none lg:h-12 focus:outline-none focus:placeholder-transparent focus:ring-0"
                    placeholder="Articles, journals, documents..."
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="px-4 py-2 text-lg">
                Message <span className="text-primary">*</span>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="p-4 text-lg bg-transparent rounded-xl border border-gray appearance-none focus:outline-none  lg:h-56"
              ></textarea>
              {requiredMessage && <div className="pt-2 pl-4 text-primary text-sm">This field should be required.</div>}
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-left text-lg text-lightgray">
                By submitting this form you consent to us emailing you occasionally about our product and community. You
                can unsubscribe from emails at any time, and we will never pass your email onto third parties.
                <br />
                <span className="text-primary">Privacy Policy</span>
              </div>
              <div className="flex justify-center">
                <div className="cursor-pointer bg-primary text-white rounded-full px-8 py-2" onClick={submit}>
                  SUBMIT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative p-4 my-4 mx-0 sm:mx-8 md:mx-10 xl:mx-20 overflow-hidden">
        <img className="absolute rounded-2xl top-0 left-0 w-full h-full" src={contact_join_us}></img>
        <div className="relative my-8 flex flex-col items-center space-y-8 text-white">
          <div className="text-4xl font-bold">Want to Join us?</div>
          <div className="text-lg">
            We are a new generation of researchers building the world's first decentralized community-reviewed
            publication protocol for the social sciences.
          </div>
          <div className="px-8 py-2 bg-primary text-white rounded-full">GET STARTED</div>
        </div>
      </div>
      <div className="mx-0 sm:mx-4 md:mx-10 xl:mx-20">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Contact;
