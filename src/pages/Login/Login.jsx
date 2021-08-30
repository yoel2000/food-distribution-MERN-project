import React, { useContext } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import './Login.css';
import { UserContext } from '../../UserContext';

const axios = require('axios')


function Login() {

    // yoel.bensoussan@gmail.com
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useContext(UserContext)

    let history = useHistory();

    let mySubmitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/login", {
            'email': email,
            'password': password
        }).then((res, err) => {
            if (err)
                alert(err)
            if (res.data) {
                //setUser(res.data.user);
                debugger;
                sessionStorage.setItem('cur_user',JSON.stringify(res.data.user))
                history.push('/home_manager')
            }
        })

    }
    return (
        <div className="login-wrapper">
            <h1> Please login</h1>
            <form onSubmit={mySubmitHandler}>
                <input type="text" className="mb-3" placeholder="email:" onChange={(event) => setEmail(event.target.value)} /> <br />
                <input type="text" className="mb-3" placeholder="password:" onChange={(event) => setPassword(event.target.value)} /> <br />
                <Button variant="primary" type="submit"> Login </Button>
            </form>
        </div>
    );
}

export default Login