// react imports
import React from "react";
import "./WelcomeFooter.css";

function WelcomeFooter() {
  return (
    <div className="welcomefooter">
      {/* logo of footer */}
      <div className="welcomefooter__logo">
        <img
          src="data:image/png;base64,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"
          alt="footerlogo"
        ></img>
      </div>
      {/* links for footer */}
      <div className="welcomefooter__links">
        <span className="welcomefooter__links__link-item">
          Amazon Prime Clone Terms and Privacy &nbsp; &nbsp;
        </span>
        <span className="welcomefooter__links__link-item">
          Send Us feedback &nbsp; &nbsp;
        </span>
        <span className="welcomefooter__links__link-item">
          Help&nbsp; &nbsp;
        </span>
      </div>
    </div>
  );
}

export default WelcomeFooter;
