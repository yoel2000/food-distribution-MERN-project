import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
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
        <div>
        <form onSubmit={mySubmitHandler}>
            <input type="text" placeholder="email:" onChange={(event)=>setEmail(event.target.value)}/> <br />
            <input type="text" placeholder="password:" onChange={(event)=>setPassword(event.target.value)}/> <br />
            <input type="submit" value="login"/><br />
        </form>
        </div>
    );
}

export default Login