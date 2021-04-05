import React from "react";
import "./Cart.css";

class Cart extends React.Component {
  state = {
    data: null,
  };

  render() {
    if (!this.state.data) {
      return (
        <div className="container">
          <h1>Cart</h1>
          <p>Your Cart is empty</p>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Cart</h1>
      </div>
    );
  }
}

export default Cart;
