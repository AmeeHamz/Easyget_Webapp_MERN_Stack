import React from "react";
import "./PageNotFound.css";
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";

const PageNotFound = () => {
  const [{dark }, dispatch] = useStateValue();

  return (
    <>
      <div className={dark?"dark_main_body":"main_body"}>
        <div className={dark?"dark_center_body":"center_body"}>

          <h1>404</h1>
          <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
          <p>
            the page you are looking for might have been removed had its name
            changed or is temporarily<br/> unavailable
          </p>
          <Link to="/">
            go to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
