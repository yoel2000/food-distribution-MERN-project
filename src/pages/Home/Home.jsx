import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return(
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


      </h1>
      )

}

export default Home