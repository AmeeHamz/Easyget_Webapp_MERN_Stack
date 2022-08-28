import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsThumb from "./ProductDetailsThumb";
import ProductsAPI from "./ProductsAPI";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useStateValue } from "./StateProvider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReactImageMagnify from "react-image-magnify";
import StarIcon from "@mui/icons-material/Star";

export default function ProductDetails() {
  const [{ basket, dark }, dispatch] = useStateValue();
  const { id } = useParams();
  // const value = useContext(DataContext)
  // const [products] = value.products
  // const addCart = value.addCart

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  const details = ProductsAPI.filter((product, index) => {
    // our data type should be matchable of product.id and id in below line of code
    // if we will write === then its will give us error because data type is not same
    // we are getting the value of id form params his id is in string
    //  and we are matching with product.id his data type isin int, so its give us error
    // and no element of object will stored in details variable
    // product.id=product.id.toString();
    return product.id == id;
  });
  console.log(details);

  const indItemQuantity = basket.filter((elem) => {
    return elem.id == id;
  });

  const addToBasket = (id, title, images, rprice, rating, quantity) => {
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

    setShow(true);
  };

  // increment the item
  const increment = (id) => {
    dispatch({
      type: "INCREMENT",
      payload: id,
      // item: {
      //   id: id,
      //   quantity:quantity,
      // },
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
    <>
      <Header />
      {/* {dark ? (
        <h1>Hello,DARK MODE this page run on this product id {id}</h1>
      ) : (
        <h1>Hello,LIGHT MODE this page run on this product id {id}</h1>
      )} */}
      {/* <h1>Hello this page run on this product id {id}</h1> */}

      {details.map((product) => (
        <div className={dark ? "dark_details" : "details"} key={product.id}>
          <div className={dark ? "dark_img-container" : "img-container"}>
            <ReactImageMagnify
              style={{ cursor: "pointer" }}
              {...{
                smallImage: {
                  alt: "productdetailstimg",
                  // isFluidWidth: true,
                  width: 420,
                  height: 500,
                  src: `${
                    dark ? product.darkimages[index] : product.images[index]
                  }`,
                },
                largeImage: {
                  src: `${
                    dark ? product.darkimages[index] : product.images[index]
                  }`,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "190%",
                  height: "135%",
                },
                shouldUsePositiveSpaceLens: true,
              }}
            />
            {/* style={{ backgroundImage: `url(${product.images[index]})` }} */}
            {/* /> */}
          </div>

          <div
            className={
              dark ? "dark_img-container_mobile" : "img-container_mobile"
            }
          >
            <img
              src={dark ? product.darkimages[index] : product.images[index]}
              alt="mobile_product_details_pic"
            />
          </div>

          <div className={dark ? "dark_box-details" : "box-details"}>
            <h2 title={product.title}>{product.title}</h2>
            <span className="box-details-real-price">
              {product.rprice}
              <span className="box-details-real-dollar">&nbsp;$</span>
            </span>
            <strike
              className={
                dark
                  ? "dark_box-details-strike-price"
                  : "box-details-strike-price"
              }
            >
              {product.sprice}
              <span
                className={
                  dark
                    ? "dark_box-details-strike-dollar"
                    : "box-details-strike-dollar"
                }
              >
                &nbsp;$
              </span>
            </strike>

            <div className="box-details__rating">
              {Array(product.rating)
                .fill()
                .map((_, i) => (
                  <p>
                    <StarIcon />
                  </p>
                ))}
            </div>

            <p
              className={
                dark
                  ? "dark_box-details-about-this-item"
                  : "box-details-about-this-item"
              }
            >
              About this item
            </p>
            <ul>
              <li
                className={
                  dark ? "dark_box-details-content" : "box-details-content"
                }
              >
                {product.description1}
              </li>
              <li
                className={
                  dark ? "dark_box-details-content" : "box-details-content"
                }
              >
                {product.description2}
              </li>
              <li
                className={
                  dark ? "dark_box-details-content" : "box-details-content"
                }
              >
                {product.description3}
              </li>
            </ul>
            <div
              className={
                dark
                  ? "dark_box-details-main-thumb-for-whole"
                  : "box-details-main-thumb-for-whole"
              }
            >
              <ProductDetailsThumb
                images={dark ? product.darkimages : product.images}
                setIndex={setIndex}
              />
            </div>
            <div className="btn_and_qty_main">
              <div>
                {indItemQuantity.length == 0 ? (
                  <button
                    className="box-details-btnn-1"
                    onClick={() =>
                      addToBasket(
                        product.id,
                        product.title,
                        dark ? product.darkimages[0] : product.images[0],
                        product.rprice,
                        product.rating,
                        product.quantity
                      )
                    }
                  >
                    Add to Basket
                  </button>
                ) : (
                  <Link to="/checkout">
                    <button className="box-details-btnn-2">Go to Basket</button>
                  </Link>
                )}
              </div>
              <div>
                {show ? (
                  <div>
                    <span
                      className={
                        dark
                          ? "dark_box-details-quantity"
                          : "box-details-quantity"
                      }
                    >
                      Quantity:
                    </span>
                    <RemoveIcon
                      className="box-details-dec"
                      onClick={() => decrement(product.id)}
                    ></RemoveIcon>

                    <input
                      type="text"
                      className={
                        dark
                          ? "dark_box-details-disable-input-quan"
                          : "box-details-disable-input-quan"
                      }
                      // placeholder={basket.map((elem) => elem.quantity)} disabled />
                      placeholder={
                        indItemQuantity.length == 0
                          ? setShow(false) // firstly I was showing here "0" by default in placeholder of every item details page but for toggle feature "setShow(false)"
                          : indItemQuantity.map((elem) => elem.quantity)
                      }
                      disabled
                    />
                    <AddIcon
                      className="box-details-inc"
                      onClick={() => increment(product.id)}
                    ></AddIcon>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {basket.length <= 2 ? (
        <Footer1 />
      ) : (
        <Footer name="MAIN_WHOLE_FOOTER_CONTAINER_for_product_detailspg" />
      )} */}
      <Footer name="Product_details_page" />
    </>
  );
}
