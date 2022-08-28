import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import Header from "./Header";
import Footer from "./Footer";

function Orders() {
  const [{ dark }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  const userOrdersPage = async () => {
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

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      } else {
        console.log(data);
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userOrdersPage();
  }, []);

  //   const [orders, setOrders] = useState([]);

  //   useEffect(() => {
  //     if(user) {
  //         db
  //         .collection('users')
  //         .doc(user?.uid)
  //         .collection('orders')
  //         .orderBy('created', 'desc')
  //         .onSnapshot(snapshot => (
  //             setOrders(snapshot.docs.map(doc => ({
  //                 id: doc.id,
  //                 data: doc.data()
  //             })))
  //         ))
  //     } else {
  //         setOrders([])
  //     }

  //   }, [user])

  return (
    <>
      <Header />
      <div className={dark ? "dark_orders" : "orders"}>
        {orders.length === 0 ? (
          <h1>Your Orders History Is Empty</h1>
        ) : (
          <h1>Your Orders History</h1>
        )}

        <div className="orders__order">
          {orders
            .map((order) => (
              <Order
                order={order.basket}
                orderamount={order.totalAmount}
                orderdate={order.date}
                orderID={order._id}
              />
            ))
            .reverse()}
        </div>
      </div>

      {orders.length === 0 ? (
        <Footer name="Returns_orders_page_length_zero" />
      ) : (
        <Footer name="Returns_orders_page" />
      )}
    </>
  );
}

export default Orders;
