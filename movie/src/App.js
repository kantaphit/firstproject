import React from "react";
import "./App.css";
import Store from "./Store.js";
import Cart from "./Cart.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  return (
    <Router>
      <div>
        <div className="headContainer">
          <div className="headItem">
            <Link to="/">Home</Link>
          </div>
          <div className="headItem">
            <FontAwesomeIcon icon="coffee" />
            <Link to="/store">Store</Link>
          </div>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/store">
            <CartCompoent />
          </Route>
          <Route path="/">
            <HomeComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function HomeComponent() {
  return <Store />;
}

function CartCompoent() {
  return <Cart />;
}
