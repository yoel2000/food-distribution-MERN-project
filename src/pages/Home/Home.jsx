import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo_food_distribution.jpg'
import './Home.css'

function Home() {
    return(
      <div>
      <h1>
      <Link to="/login">
            Log in <br/>
      </Link>
      <Link to="/register">
            Register <br/>
      </Link>
      <Link to='/home_worker'> Home worker</Link>
      </h1>
      <img src={logo} alt="Logo" className="container-div" />
      </div>
      )

}

export default Home