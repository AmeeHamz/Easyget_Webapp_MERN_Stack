import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Footer from "./Footer";
import { AnimatedList } from "react-animated-list";

function Checkout() {
  const [{ basket, user, totalItem,dark }, dispatch] = useStateValue();

  return (
    <>
      <Header />
      <div className={dark?"dark_checkout":"checkout"}>
        <div className="checkout__left">
          <img
            className={dark?"dark_checkout__ad":"checkout__ad"}
            // src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            src="/images/banner.png"
            alt="checkout add "
          />

          <div>
            {totalItem == 0 ? (
              <h2 className={dark?"dark_checkout__title":"checkout__title"}>Your Shopping Basket Is Empty</h2>
            ) : (
              <h2 className={dark?"dark_checkout__title":"checkout__title"}>
                You Have&nbsp;
                <span style={{ color: "seagreen" }}>{`${totalItem}`}</span>
                &nbsp;Items In Shopping Basket
              </h2>
            )}

            <AnimatedList animation={"collapse"}>
              {/* grow, fade, slide, zoom, collapse */}

              {basket.map((item) => (
                <CheckoutProduct
                  // // Finding the right Keys damn
                  // key={item.id.toString()
                  // key={item.id}
                  key={new Date().getMilliseconds()}
                  id={item.id}
                  title={item.title}
                  images={item.images}
                  rprice={item.rprice}
                  rating={item.rating}
                  quantity={item.quantity}
                />
              ))}
            </AnimatedList>
          </div>
        </div>
        {totalItem == 0 ? null : (
          <div className="checkout__right">
            <Subtotal />
          </div>
        )}
      </div>
      <Footer name="Checkout_page" />
    </>
  );
}

export default Checkout;
