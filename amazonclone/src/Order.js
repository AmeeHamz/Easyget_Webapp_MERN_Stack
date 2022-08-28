import React from "react";
import "./Order.css";
import moment from "moment";
import { useStateValue } from "./StateProvider";
import PaymentReviewProduct from "./PaymentReviewProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order, orderamount, orderdate, orderID }) {
  const [{ dark }, dispatch] = useStateValue();

  return (
    <div className={dark?"dark_order":"order"}>
      <h2 className={dark?"dark_order_name":"order_name"}>Order</h2>
      <p className={dark?"dark_order_date":"order_date"}>{moment(orderdate).format("Do MMMM YYYY, h:mm:ss a")}</p>
      {/* <p>{orderdate}</p> */}
      <p className={dark?"dark_order__id":"order__id"}>
        <small>{orderID}</small>
      </p>
      {order
        .map((item) => (
          <PaymentReviewProduct
            id={item.id}
            title={item.title}
            images={item.images}
            rprice={item.rprice}
            rating={item.rating}
            quantity={item.quantity}
          />
        ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className={dark?"dark_order__total":"order__total"}>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={orderamount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
