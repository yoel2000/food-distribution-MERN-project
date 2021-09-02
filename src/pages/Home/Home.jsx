import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo_food_distribution.jpg'
import './Home.css'
import background from "./logo_food_distribution.jpg";
import {
      Button,
      Container,
      Divider,
      Grid,
      Header,
      Icon,
      Image,
      List,
      Menu,
      Segment,
      Sidebar,
      Visibility,
} from 'semantic-ui-react'

function Home() {
      return (
            <div >

                  <h1 className="title">Your health. Our priority.</h1>
                  <p className="description">
                        Our employees are commited to delivering food and medication to the
                        people in need. You can join us right now.
                  </p>
                  <img src={logo} alt="Logo" className="container-div" />
                  <div className="actions">
                        <Link className="register" style={{ color: "deepPink" }} to="/register">
                              Join us
                        </Link>
                        <Link className="login" style={{ color: "deepPink" }} to="/login">
                              Log in
                        </Link>
                  </div>
            </div>
      )

}

export default Home