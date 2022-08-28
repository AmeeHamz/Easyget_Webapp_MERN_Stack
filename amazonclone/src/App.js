import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./Checkout";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Payment from "./Payment";
// import Orders from "./Orders";
import ProductDetails from "./ProductDetails";
import SearchProducts from "./SearchProducts";
import { ToastContainer, Slide, Zoom, Flip, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import ProductDetails1 from "./ProductDetails1";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PrimeApp from "./PrimeVideo/PrimeApp";
import WelcomeHomePrime from "./PrimeVideo/WelcomePage/WelcomeHomePrime";
import ScrollToTop from "./ScrollToTop";
import PageNotFound from "./PageNotFound";
import { useStateValue } from "./StateProvider";
import Orders from "./Orders";
const promise = loadStripe(
  "pk_test_51KK0vfDpQ2FFZswE3ksDNRrAas5XbzxRgkl5dvPujQoIiWGw66c4Nde5rCtK9Gfgsju6cXg2ytdfe1ITVrxV8lj900CfPF4Z5g"
);

function App() {
  const [{dark }, dispatch] = useStateValue();

  return (
    <div className={dark? "dark_body":"body"}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="productdetails/:id" element={<ProductDetails />} />
          <Route
            exact
            path="searchproducts/:title"
            element={<SearchProducts />}
          />
          <Route
            exact
            path="payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          {/* <Route exact path="orders" element={<Orders />} /> */}

          {/* <Route exact path="productdetails1/:id" element={ <ProductDetails1 /> } /> */}
          {/* <Route  path="/" element={<Home/>}/> */}
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
          {/* <Route exact path="checkout/login" element={<Login />} /> */}
          <Route exact path="primevideos" element={<WelcomeHomePrime />} />
          <Route exact path="primevideos_freetrial" element={<PrimeApp />} />
          <Route exact path="checkout" element={<Checkout />} />
          <Route exact path="orders" element={<Orders />} />
          <Route exact path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
      <ToastContainer limit={4} transition={Bounce} />
    </div>
  );
}

export default App;
