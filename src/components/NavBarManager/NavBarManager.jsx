import React, { useState } from "react"
import { useEffect } from "react";
import { NavLink } from "react-router-dom"

function NavbarManager() {
  const [isOpen, setOpen] = useState(false);
  const [manager, setManager] = useState(false)

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('cur_user'))?.isManager){
      setManager(true)}
    else
      setManager(false)
  },[])

  let links=()=>{
    let links=[]
    if (manager)
      links=[
        {to:"/home_manager", child:"Home"},
        {to:"/addressesUpdate", child:"Addresses update"},
      {to:"/dividersUpdate", child:"Distributors Update"},
      {to:"/dailyDistribution", child:"Daily Distribution"},
      {to:"/chat", child:"Chat"},
      {to:"/blog", child:"Blog"},
      {to:"/mychart", child:"Charts"},
      ]
      else 
      links=[
      {to:"/home_worker", child:"Home"},
      {to:"/yourDeliveries", child:"Your Deliveries"},
      {to:"/watchBlog", child:"Blog"},
      {to:"/chat", child:"Chat"},
      ]
      return links;
  }
  

  return (
    <nav role="navigation" className="navbar navbar-light" style={{ backgroundColor: "aliceblue" }} aria-label="main navigation">
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
          {links().map((x,key)=><NavLink className="navbar-item" activeClassName="is-active" to={x.to}>
              {x.child}
            </NavLink>)}
            {/* <NavLink className="navbar-item" activeClassName="is-active" to="/addressesUpdate">
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
            </NavLink> */}
          </div>
        </div>
    </nav>
  )

}

export default NavbarManager