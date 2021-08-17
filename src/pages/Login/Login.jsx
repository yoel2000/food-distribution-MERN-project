import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import './Login.css';

const axios = require('axios')


function Login() {

    // yoel.bensoussan@gmail.com
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history= useHistory();

    let mySubmitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/login", {
            'email': email,
            'password': password
        }).then((res)=>{console.log(res); history.push('/home')})

    }
    return(
        <div className="login-wrapper">
        <h1> Please login</h1>
        <form onSubmit={mySubmitHandler}>
            <input type="text" className="mb-3" placeholder="email:" onChange={(event)=>setEmail(event.target.value)}/> <br />
            <input type="text" className="mb-3" placeholder="password:" onChange={(event)=>setPassword(event.target.value)}/> <br />
            { /*<input type="submit" value="login"/><br /> */}
            <Button variant="primary" type="submit"> Login </Button>
        </form>
        </div>
    );
}

export default Login