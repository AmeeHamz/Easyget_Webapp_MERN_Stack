import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import PaymentReviewProduct from "./PaymentReviewProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import Header from "./Header";
import Footer from "./Footer";
import { getBasketTotal } from "./reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const [{ basket, totalItem, totalAmount, dark }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [complete, setComplete] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const userContact = async () => {
    try {
      const resp = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.firstname,
        email: data.email,
        phone: data.phone,
      });
      setUserFName(data.firstname);
      setUserLName(data.lastname);
      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    try {
      const resp = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await resp.json();

      // console.log(data);
      if (resp.status === 400 || !data) {
        dark
          ? toast.warning(`${data}`, {
              theme: "dark",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.warning(`${data}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

        // window.alert(data);
        console.log(data);
      } else {
        dark
          ? toast.success(`${data}`, {
              theme: "dark",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success(`${data}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        // window.alert("Message Sent Successfully");
        console.log(data);
        setUserData({ ...userData, message: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    // console.log("Awesome");
  }, [basket]);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const amount = await getBasketTotal(basket);
      // console.log(amount);
      const response = await fetch(`/payments/create?total=${amount}`, {
        method: "post",

        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ totalAmount}),
      });
      const data = await response.json();

      setClientSecret(data.clientSecret);
      console.log(
        "THE CLIENT SECRET IS FOR STRIPE PAYMENT >>>",
        data.clientSecret
      );
    };

    getClientSecret();
  }, []);
  // console.log(basket);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // do all the fancy stripe stuff...

      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          // paymentIntent = payment confirmation

          setSucceeded(true);
          setError(null);
          setProcessing(false);
        });
      const resp = await fetch("/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ basket, totalAmount }),
      });

      const data = await resp.json();

      // console.log(data);
      if (resp.status === 400 || !data) {
        dark
          ? toast.error("Order Error", {
              theme: "dark",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.error("Order Error", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        // window.alert(data);
        console.log("basket not stored");
      } else {
        dark
          ? toast.success("Your order placed successfully", {
              theme: "dark",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("Your order placed successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        console.log("basket stored");
        // window.alert("Your order has successfully placed");
        // console.log(data);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    // console.log(event);
    if (event.complete == false) {
      console.log("card is incomplete");
      setComplete(false);
    } else {
      console.log("card is fully complete");
      setComplete(true);
    }
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <>
      <Header />
      <div className={dark ? "dark_payment" : "payment"}>
        <div
          className={dark ? "dark_payment__container" : "payment__container"}
        >
          <h1>
            Checkout (<Link to="/checkout">{totalItem} items</Link>)
          </h1>

          {/* Payment section - delivery address */}
          <div className={dark ? "dark_payment__section" : "payment__section"}>
            <div className={dark ? "dark_payment__title" : "payment__title"}>
              <h3>Delivery Address</h3>
            </div>
            <div
              className={dark ? "dark_payment__address" : "payment__address"}
            >
              <p>
                <span style={{ fontWeight: "500", fontSize: "17px" }}>
                  {userFName}
                  &nbsp;&nbsp;{userLName}
                </span>
              </p>
              <p>{userData.email}</p>
              <p>{userData.phone}</p>
            </div>
          </div>

          {/* Payment section - Review Items */}
          <div className={dark ? "dark_payment__section" : "payment__section"}>
            <div className={dark ? "dark_payment__title" : "payment__title"}>
              <h3>Review items and delivery</h3>
            </div>
            <div className={dark ? "dark_payment__items" : "payment__items"}>
              {basket.map((item) => (
                <PaymentReviewProduct
                  id={item.id}
                  title={item.title}
                  images={item.images}
                  rprice={item.rprice}
                  rating={item.rating}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>

          {/* Payment section - product improvement suggestion */}
          <div className={dark ? "dark_payment__section" : "payment__section"}>
            <div className={dark ? "dark_payment__title" : "payment__title"}>
              <h3>Suggestion Form</h3>
            </div>
            <form
              method="POST"
              className={
                dark ? "dark_payment_suggestion" : "payment_suggestion"
              }
            >
              <div className={dark ? "dark_inputs_form" : "inputs_form"}>
                <input
                  className={dark ? "dark_inputStyling" : "inputStyling"}
                  type="text"
                  value={userData.name}
                  onChange={handleInputs}
                  placeholder={"Your name"}
                  name="name"
                  maxlength="20"
                  // minLength="3"
                />
                <input
                  className={dark ? "dark_inputStyling" : "inputStyling"}
                  type="email"
                  value={userData.email}
                  onChange={handleInputs}
                  placeholder="Your email"
                  name="email"
                />
                <input
                  className={dark ? "dark_inputStyling" : "inputStyling"}
                  type="tel"
                  value={userData.phone}
                  onChange={handleInputs}
                  placeholder="Your phone number"
                  name="phone"
                  maxlength="12"
                />
              </div>
              <div className={dark ? "dark_textarea_form" : "textarea_form"}>
                <textarea
                  type="text"
                  value={userData.message}
                  onChange={handleInputs}
                  placeholder="Any suggestion drop out here for our products improvement..."
                  rows="5"
                  cols="50"
                  name="message"
                  maxlength="200"
                  required
                />
              </div>
              <div className="submit_btnn">
                <input type="submit" onClick={contactForm} />
              </div>
            </form>
          </div>

          {/* Payment section - Payment method */}
          <div className={dark ? "dark_payment__section" : "payment__section"}>
            <div className="payment_details_test">
              <div className={dark ? "dark_payment__title" : "payment__title"}>
                <h3>Payment Method</h3>
              </div>
              <div
                className={dark ? "dark_payment__details" : "payment__details"}
              >
                {/* Stripe magic will go */}

                <form
                  method="POST"

                  // onSubmit={
                  //   !error
                  //     ? handleSubmit
                  //     : (e) => {
                  //         e.preventDefault();
                  //       }
                  // }
                >
                  {dark ? (
                    <CardElement
                      onChange={handleChange}
                      options={{
                        iconStyle: "solid",
                        style: {
                          base: {
                            fontSize: "15px",
                            lineHeight: "1.5",
                            "::placeholder": {
                              fontSize: "14px",
                              color: "darkgray",
                            },
                            ":focus": {
                              backgroundColor: "transparent",
                              color: "white",
                            },
                          },
                          complete: {
                            backgroundColor: "transparent",
                            color: "seagreen",
                          },
                        },
                      }}
                    />
                  ) : (
                    <CardElement
                      onChange={handleChange}
                      options={{
                        iconStyle: "solid",
                        style: {
                          base: {
                            fontSize: "15px",
                            lineHeight: "1.5",
                            "::placeholder": {
                              fontSize: "14px",
                              color: "black",
                            },
                            ":focus": {
                              backgroundColor: "transparent",
                              color: "black",
                            },
                          },
                          complete: {
                            backgroundColor: "transparent",
                            color: "seagreen",
                          },
                        },
                      }}
                    />
                  )}

                  <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => (
                        <h3 style={{ marginTop: "10px" }}>
                          Order Total: {value}
                        </h3>
                      )}
                      decimalScale={2}
                      value={totalAmount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button
                      disabled={processing || disabled || succeeded}
                      onClick={
                        !error
                          ? complete
                            ? handleSubmit
                            : (e) => {
                                setError("Full Card detail is incomplete");
                                e.preventDefault();
                              }
                          : (e) => {
                              e.preventDefault();
                            }
                      }
                    >
                      <span>
                        {processing ? (
                          <p style={{ paddingTop: "3px", color: "gray" }}>
                            Processing
                          </p>
                        ) : succeeded ? (
                          <p style={{ paddingTop: "3px", color: "#1f631d" }}>
                            Succeeded
                          </p>
                        ) : (
                          "Buy Now"
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Errors */}
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer name="Payment_page" />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Payment;
