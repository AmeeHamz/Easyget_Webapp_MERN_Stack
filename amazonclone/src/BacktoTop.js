import React from "react";
import "./FooterorBacktoTop.css";
import { HashLink } from "react-router-hash-link";

function BacktoTop() {
  return (
    <>
      <div className="backToTop">
        <HashLink smooth to="#top__page" className="top">
          <p className="pt-3">Back to Top</p>
        </HashLink>
      </div>
    </>
  );
}

export default BacktoTop;
