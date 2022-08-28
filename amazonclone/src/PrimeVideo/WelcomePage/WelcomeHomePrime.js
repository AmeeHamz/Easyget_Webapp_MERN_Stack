// react imports
import React from "react";

// normal component import
import WelcomeNav from './WelcomeNav'
import WelcomeBanners from './WelcomeBanners'
import WelcomeFeatures from "./WelcomeFeatures";
import WelcomeFooter from "./WelcomeFooter";

const WelcomeHomePrime = () => {
  

  return (
    <React.Fragment>
      <WelcomeNav/>
      <WelcomeBanners/>
      <WelcomeFeatures/>
      <WelcomeFooter />
    </React.Fragment>
  );
};

export default WelcomeHomePrime;