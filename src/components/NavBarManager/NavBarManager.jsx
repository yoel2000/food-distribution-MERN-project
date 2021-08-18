import React, { useState } from "react"
import { NavLink } from "react-router-dom"

function NavbarManager() {
    const [isOpen, setOpen] = useState(false);
    return(
    <nav role="navigation" className="navbar navbar-light" style={{backgroundColor: "aliceblue"}} aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>

        </div>

        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" activeClassName="is-active" to="/addressesUpdate">
            Addresses update
            </NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/dividersUpdate">
            Dividers update
            </NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/dailyDistribution">
            Daily distribution
            </NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/chat">
            Chat
            </NavLink>
            <NavLink className="navbar-item" activeClassName="is-active" to="/blog">
            Blog
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
    )

}

export default NavbarManager