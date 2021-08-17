import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [isOpen, setOpen] = useState(false);
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>

        </div>

        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" activeClassName="is-active" to="/">
              Home
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/contactUs"
            >
              Contact us
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
            <NavLink className="navbar-item" to="/login">
              Log in
            </NavLink>
            </div>
            <div className="navbar-item">
            <NavLink className="navbar-item" to="/register">
              Register
            </NavLink>
            </div>
            </div>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;