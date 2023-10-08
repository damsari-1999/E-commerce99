import React from "react";
import "./CartScreen.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userDetails"))._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/item/cart/${userId}`)
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <br />
      <h1>Cart Items</h1>
      <br />
      <ul class="list-group">
        {cartItems.map((item, index) => (
          <li class="list-group-item">
            <b>
              {item.itemName} - {item.type}
            </b>{" "}
            <br /> {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartScreen;
