import React from "react";
import "./ProductsforSlickSlider.css";
import { Link } from "react-router-dom";

function ProductsforSlickSlider({ id, images }) {
  return (
    <>
      <div>
        <Link to={`/productdetails/${id}`}>
          <img className="slideslick__pic" src={images} alt="slideslick pic" />
        </Link>
      </div>
    </>
  );
}

export default ProductsforSlickSlider;
