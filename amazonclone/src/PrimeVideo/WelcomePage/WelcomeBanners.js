import React from "react";
import "./WelcomeBanners.css";
import { Link } from "react-router-dom";
import welcome1 from "./images/welcome1.jpg";
import welcome2 from "./images/welcome2.jpg";
import welcome3 from "./images/welcome3.jpg";
import { useNavigate } from "react-router-dom";

const WelcomeBanners = () => {
  const navigate = useNavigate();
  const callPrimePage = async () => {
    try {
      const resp = await fetch("/primevideos_freetrials", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      console.log(data);

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      } else {
        navigate("/primevideos_freetrial");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <>
      {/* Banner 1 */}
      <div className="welcomebanner1">
        <div className="welcomebanner1__contet">
          <h1 className="welcomebanner1__contet__title">
            Welcome to Prime Video
          </h1>
          <br />
          <p className="welcomebanner1__contet__decscription">
            Join Prime to watch the latest movies, TV shows and award-winning
            Amazon Originals
          </p>
          <br />
          {/* <Link to="/primevideos_freetrial"> */}
          <button method="GET" onClick={callPrimePage}>
            Start your 30-day free trial
          </button>
          {/* </Link> */}
        </div>
        <div className="welcomebanner1_img">
          <img
            src={welcome1}
            alt="welcome1"
            className="animate__animated animate__zoomIn"
          ></img>
        </div>
      </div>

      {/* Banner 2*/}
      <div className="welcomebanner2">
        <div className="welcomebanner2__img">
          <img
            src={welcome2}
            alt="welcome2"
            className="animate__animated animate__zoomIn"
          ></img>
        </div>
        <div className="welcomebanner2__content">
          <h1 className="welcomebanner2__content__title">
            Great Entertainment
          </h1>
          <br />
          <p className="welcomebanner2__contet__decscription">
            With your Prime membership, you have access to exclusive Amazon
            Originals, blockbuster Bollywood movies, regional movies and more.
          </p>
          <br />
          <button>Get Started</button>
        </div>
      </div>
      {/* Banner 3 */}
      <div className="welcomebanner3">
        <div className="welcomebanner3__img">
          <img
            src={welcome3}
            alt="welcome3"
            className="animate__animated animate__zoomIn"
          ></img>
        </div>
        <div className="welcomebanner3__line"></div>
        <div className="welcomebanner3__content">
          <h1 className="welcomebanner3__content__title">
            Even better with Fire TV Stick
          </h1>
          <br />
          <p className="welcomebanner3__contet__decscription">
            The biggest movies and TV shows are always better on a big screen.
            Simply plug in your Amazon Fire TV Stick and stream on any HDTV.
            Press the voice button on the remote and say the name of the title
            you want to watch to find it in seconds.
          </p>
          <br />
          <button>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default WelcomeBanners;
