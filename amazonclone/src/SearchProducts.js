import React from "react";
import "./SearchProducts.css";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Header from "./Header";
import ProductsAPI from "./ProductsAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Footer from "./Footer";

//for react tooltip
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale-extreme.css";

function SearchProducts() {
  const { title } = useParams();

  const [{ basket, dark }, dispatch] = useStateValue();

  const addToBasket = (
    id,
    title,
    rprice,
    rating,
    images,
    quantity,
  ) => {
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
      autoClose: 5000,
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

  const newDetails = ProductsAPI.filter((value) => {
    return value.title.toLowerCase().includes(title.toLowerCase());
  });

  return (
    <>
      <Header />
      <h1 className="search_product_main_heading">
        {newDetails.length == 0 ? (
          <span style={{ color: "red" }}>{newDetails.length}</span>
        ) : (
          <span style={{ color: "#2eab65" }}>{newDetails.length}</span>
        )}
        <span className={dark ? "dark_srch_result" : "srch_result"}>
          &nbsp;results for &nbsp;
        </span>
        <span style={{ color: "sandybrown" }}>"{title}"</span>
      </h1>
      <div className={dark?"dark_containerself":"containerself"}>
        <div className="row">
          {newDetails.map((product) => (
            <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div
                className={dark ? "dark_product__search" : "product__search"}
              >
                <div className="product__search__inner">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={dark ? product.darkimages[0] : product.images[0]}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="product__search__info">
                  <Link
                    to={`/productdetails/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p
                      className={
                        dark
                          ? "dark_product__search__des"
                          : "product__search__des"
                      }
                    >
                      {product.title}
                    </p>
                  </Link>
                  <div className="product__search__rating">
                    {Array(product.rating)
                      .fill()
                      .map((_, i) => (
                        <p>
                          <StarIcon />
                        </p>
                      ))}
                  </div>
                  <div>
                    <h1
                      className={
                        dark
                          ? "dark_product__search_Price_name"
                          : "product__search__Price_name"
                      }
                    >
                      Price:
                    </h1>
                  </div>

                  <p
                    className={
                      dark
                        ? "dark_product__search__price"
                        : "product__search__price"
                    }
                  >
                    <span
                      className={
                        dark
                          ? "dark_product__search_real__price"
                          : "product__search__real__price"
                      }
                    >
                      {product.rprice}
                    </span>
                    <strong className="product__search__real__dollar">
                      &nbsp;$
                    </strong>
                    &nbsp;&nbsp;
                    <strike
                      className={
                        dark
                          ? "dark_product__search_strike__price"
                          : "product__search__strike__price"
                      }
                    >
                      {product.sprice}
                      <span className="product__search__strike__dollar">$</span>
                    </strike>
                  </p>
                </div>

                {/* <button className="product__btn" onClick={addToBasket}>Add to Basket</button> */}
                <Tippy
                  theme={dark ? "dark" : "light"}
                  arrow={false}
                  animation={"fade"}
                  placement={"bottom"}
                  content={
                    <h1
                      className={
                        dark
                          ? "dark_SearchProduct_Add_to_basket_tippy"
                          : "SearchProduct_Add_to_basket_tippy"
                      }
                    >
                      Add To Basket
                    </h1>
                  }
                >
                  <ShoppingBasketIcon
                    className="product__search__btn"
                    onClick={() =>
                      addToBasket(
                        product.id,
                        product.title,
                        product.rprice,
                        product.rating,
                        dark ? product.darkimages[0] : product.images[0],
                        product.quantity,
                      )
                    }
                  ></ShoppingBasketIcon>
                </Tippy>
              </div>
            </div>
          ))}
        </div>
      </div>

      {newDetails.length <= 4 ? (
        newDetails.length == 1 ? (
          <Footer name="Search_product_page_for_1_srches" />
        ) : newDetails.length == 2 ? (
          <Footer name="Search_product_page_for_2_srches" />
        ) : newDetails.length == 3 ? (
          <Footer name="Search_product_page_for_3_srches" />
        ) : newDetails.length == 4 ? (
          <Footer name="Search_product_page_for_4_srches" />
        ) : (
          ""
        )
      ) : (
        <Footer name="Search_product_page_above_4srches" />
      )}
    </>
  );
}

export default SearchProducts;
