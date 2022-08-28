import React from "react";
import "./CheckoutProduct.css";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
// import ReactImageMagnify from "react-image-magnify";
import { useStateValue } from "./StateProvider";
import { height } from "@mui/system";
// import test from "./test.jpg";
import { Link } from "react-router-dom";

function CheckoutProduct({
  id,
  images,
  title,
  rprice,
  rating,
  quantity,
  hideButton,
}) {
  const [{ basket, dark }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  // increment the item
  const increment = (id) => {
    dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  // decrement the item
  const decrement = (id) => {
    dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  return (
    <div className={dark?"dark_checkoutProduct":"checkoutProduct"}>
      <Link to={`/productdetails/${id}`}>
        <img
          className="checkoutProduct__image"
          src={images}
          alt="checkoutProductImage"
        />
      </Link>

      <div className="checkoutProduct__info">
        <p
          className={
            dark ? "dark_checkoutProduct__title" : "checkoutProduct__title"
          }
        >
          {title}
        </p>
        <div>
          <span
            className={
              dark
                ? "dark_checkoutProduct__Price_name"
                : "checkoutProduct__Price_name"
            }
          >
            Price:
          </span>
          <span
            className={
              dark
                ? "dark_checkoutProduct__product__price"
                : "checkoutProduct__product__price"
            }
          >
            <span
              className={
                dark
                  ? "dark_checkoutProduct__real__price"
                  : "checkoutProduct__real__price"
              }
            >
              {rprice}
            </span>
            <strong
              className={
                dark
                  ? "dark_checkoutProduct__real__dollar"
                  : "checkoutProduct__real__dollar"
              }
            >
              &nbsp;$
            </strong>
            &nbsp;&nbsp;
          </span>
        </div>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon />
              </p>
            ))}
        </div>
        <div>
          <span className={dark?"dark_checkoutProduct__quantity":"checkoutProduct__quantity"}>Quantity: </span>
          <RemoveIcon
            className="checkoutProduct__dec"
            onClick={() => decrement(id)}
          ></RemoveIcon>
          <input
            className={dark?"dark_checkoutProduct__disable__input__quan":"checkoutProduct__disable__input__quan"}
            type="text"
            placeholder={quantity}
            disabled
          />
          <AddIcon
            className="checkoutProduct__inc"
            onClick={() => increment(id)}
          ></AddIcon>
        </div>

        {!hideButton && (
          <button onClick={removeFromBasket}> Remove from Basket</button>
        )}
      </div>
    </div>
  );
}
export default CheckoutProduct;
