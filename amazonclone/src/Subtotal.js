import React, { useEffect } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket, totalItem, totalAmount, dark }, dispatch] = useStateValue();

  const callPaymentPage = async () => {
    try {
      const resp = await fetch("/payments", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      console.log(data);

      if(!resp.status===200)
      {
        const error=new Error(resp.error);
        throw error;
      }
      else{
        navigate('/payment');

      }
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    // console.log("Awesome");
  }, [basket]);
  console.log(`The total subitems are ${totalItem}`);

  return (
    <div className={dark ? "dark_subtotal" : "subtotal"}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({totalItem} items): <strong>{value}</strong>
            </p>
            <small className={dark ? "dark_subtotal__gift" : "subtotal__gift"}>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={totalAmount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button method="GET" onClick={callPaymentPage}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
