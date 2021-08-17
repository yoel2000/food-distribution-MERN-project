import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './logo_food_distribution.jpg'
import home from './Home.css'

function Home() {
    return(
      <div>
      <h1>
      <Link to="/login">
            Log in <br/>
      </Link>
      <Link to="/chat">
            Chat <br/>
      </Link>
      <Link to="/blog">
            Blog <br/>
      </Link>
      <Link to="/register">
            Register <br/>
      </Link>
      <Link to="/about">About <br/>
      </Link>
      <Link to="/contactUs"> Contact us</Link>
      </h1>
      <img src={logo} alt="Logo" className="container-div" />
      </div>
      )

}

export default Home