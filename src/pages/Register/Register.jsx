import React from 'react'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Register.css';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { isValid } from 'date-fns';

const axios = require('axios')

function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useContext(UserContext)
  let history = useHistory();

  let googleAuth=(ev)=>{
    //fetch("/auth/google").then(console.log("returned!!"))
    ev.preventDefault();
    window.open("http://localhost:8080/auth/google").then((res)=>{
      console.log(res)
      sessionStorage.setItem('cur_user',JSON.stringify(res.data.user))
      //history.push('/chat')
    });
  }

  let mySubmitHandler = async (event) => {
    event.preventDefault();
    if (isValid()) {
      axios.post('http://localhost:8080/signup2', {
        'firstname': firstName,
        'lastname': lastName,
        'email': email,
        'password': password
      }).then(res => {
        if (res.status == 200) {
           //setUser(res.data.user);
           sessionStorage.setItem('cur_user',JSON.stringify(res.data.user))
           history.push('/chat')
        }
      }).catch(x => alert("user already exist"))
    }
    else {
    }
  }

  let isValid = () => {
    if (password !== confirmPassword) {
      alert("The confirm password must be same as the password!")
    }
    if (password.length < 4) {
      alert("password must contains at least 4 characters")
    }

    return password === confirmPassword &&
      password.length >= 4;
  }

  return (
    <div>
      <div>
        <form onSubmit={mySubmitHandler}>
          <input type="text" className="mb-3" placeholder="firstname:" onChange={(event) => setFirstName(event.target.value)} /> <br />
          <input type="text" className="mb-3" placeholder="lastname:" onChange={(event) => setLastName(event.target.value)} /> <br />
          <input type="text" className="mb-3" placeholder="email:" onChange={(event) => setEmail(event.target.value)} /> <br />
          <h6 className="text-muted"> We'll never share your email with anyone else.</h6> <br />
          <input type="text" className="mb-3" placeholder="password:" onChange={(event) => setPassword(event.target.value)} /> <br />
          <input type="text" className="mb-3" placeholder="confirm your password:" onChange={(event) => setConfirmPassword(event.target.value)} /> <br />
          <Button variant="primary" type="submit">
            Register now
          </Button>
        </form>
        <p>You can also register with: </p> <br />
        <div>
          <input type="button" value= "google" onClick={googleAuth}/>
          <a className="social_networks" href="http://localhost:8080/auth/google">Google</a> <br /> <br />
          <a className="social_networks" href="http://localhost:8080/auth/facebook">Facebook</a> <br />
        </div>
      </div>
    </div>
  );
}


export default Register
