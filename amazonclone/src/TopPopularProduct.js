import React from "react";
import "./TopPopularProduct.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function TopPopularProduct({ id, rprice, images}) {
  const [{dark }, dispatch] = useStateValue();

  return (
    <>
      <div className="topPopular__main">
        <Link to={`/productdetails/${id}`}>
          <img className="topPopular__pic" src={images} alt="topPopular pic" />
        </Link>
        <p className={dark? "dark_topPopular__Para1":"topPopular__Para1"}>TOP TRENDING PDs</p>
        <p className="topPopular__Para2">From&nbsp;&nbsp;{rprice}&nbsp;$</p>
        <p className={dark?"dark_topPopular__Para3":"topPopular__Para3"}>Up to 9.99&nbsp;$ off on HDFC</p>
      </div>
    </>
  );
}

export default TopPopularProduct;
