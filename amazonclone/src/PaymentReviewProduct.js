import React from "react";
import "./CheckoutProduct.css";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "./StateProvider";

function PaymentReviewProduct({ id, images, title, rprice, rating, quantity }) {
  const [{ basket, dark }, dispatch] = useStateValue();

  return (
    <div className="checkoutProduct">
      <img
        // style={{ width: 200, height: 200 }}
        className="checkoutProduct__image"
        src={images}
        alt="checkoutProductImage"
      />

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
          <span
            className={
              dark
                ? "dark_checkoutProduct__quantity"
                : "checkoutProduct__quantity"
            }
          >
            Quantity:{" "}
          </span>
          <input
            className={
              dark
                ? "dark_checkoutProduct__disable__input__quan"
                : "checkoutProduct__disable__input__quan"
            }
            type="text"
            placeholder={quantity}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
export default PaymentReviewProduct;
