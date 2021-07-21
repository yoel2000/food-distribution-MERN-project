import React from 'react'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
const axios = require('axios')


function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let history= useHistory();

    let mySubmitHandler = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            axios.post('http://localhost:8080/signup2', {
                'firstname':firstName,
                'lastname':lastName,
                'email': email,
                'password': password
            }).then(history.push('/chat'))
        }
        else {
            alert("The confirm password must be same as the password!")
        }
    }

    return (
        <div>
            <form onSubmit={mySubmitHandler}>
                <input type="text" placeholder="firstname:" onChange={(event)=>setFirstName(event.target.value)}/> <br />
                <input type="text" placeholder="lastname:" onChange={(event)=>setLastName(event.target.value)}/> <br />
                <input type="text" placeholder="email:" onChange={(event)=>setEmail(event.target.value)}/> <br />
                <input type="text" placeholder="password:" onChange={(event)=>setPassword(event.target.value)}/> <br />
                <input type="text" placeholder="confirm your password:" onChange={(event)=>setConfirmPassword(event.target.value)}/> <br />
                <input type="submit" value="Register now"/><br />
            </form>
            <p1>You can also register with: </p1> <br />
            <a href="http://localhost:8080/auth/google">Google</a> <br />
            <a href="http://localhost:8080/auth/facebook">Facebook</a> <br />
        </div>
    );
}


export default Register
