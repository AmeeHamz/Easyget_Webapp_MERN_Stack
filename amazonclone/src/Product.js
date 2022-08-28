import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import FlipMove from "react-flip-move";

//for react tooltip
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale-extreme.css";

function Product({ id, title, rprice,sprice,rating, images, quantity }) {
  const [{ basket, dark }, dispatch] = useStateValue();

  const addToBasket = (id, title, rprice,rating, images, quantity) => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        images: images,
        rprice: rprice,
        rating: rating,
        quantity: quantity,
      },
    });
    toast.success(`Your product has been added "${title}" `, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: (
        <img
          style={{ height: "40px", width: "40px", objectFit: "contain" }}
          src={images}
        />
      ),
    });
  };

  return (
    <>
      <div className={dark ? "dark_product" : "product"}>
        <div className="inner">
          <Link to={`/productdetails/${id}`}>
            <img src={images} alt="Home_product_Image" />
          </Link>
        </div>
        <div className="product__info">
          <Link to={`/productdetails/${id}`} style={{ textDecoration: "none" }}>
            <p className={dark ? "dark_product__des" : "product__des"}>
              {title}
            </p>
          </Link>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>
                  <StarIcon />
                </p>
              ))}
          </div>
          <div>
            <h1 className={dark ? "dark_Price_name" : "Price_name"}>Price:</h1>
          </div>

          <p className={dark ? "dark_product__price" : "product__price"}>
            <span className={dark ? "dark_real__price" : "real__price"}>
              {rprice}
            </span>
            <strong className="real__dollar">&nbsp;$</strong>&nbsp;&nbsp;
            <strike className={dark ? "dark_strike__price" : "strike__price"}>
              {sprice} <span className="strike__dollar">$</span>
            </strike>
          </p>
        </div>

        <Tippy
          theme={dark ? "dark" : "light"}
          arrow={false}
          animation={"fade"}
          placement={"bottom"}
          content={
            <h1
              className={
                dark
                  ? "dark_Product_Add_to_basket_tippy"
                  : "Product_Add_to_basket_tippy"
              }
            >
              Add To Basket
            </h1>
          }
        >
          <ShoppingBasketIcon
            className="product__btn"
            onClick={() =>
              addToBasket(id, title, rprice,rating, images, quantity)
            }
          ></ShoppingBasketIcon>
        </Tippy>
      </div>
    </>
  );
}

export default Product;
