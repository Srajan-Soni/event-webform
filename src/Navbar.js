import React from "react";
import "./App.css";
import logo from "./assets/event.webp";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logohead">
          <img src={logo} className="logoimg"></img>
          <span className="logo">Events</span>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
