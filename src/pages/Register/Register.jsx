import React from 'react'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button} from "react-bootstrap";

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
        <div>
            <form onSubmit={mySubmitHandler}>
                <input type="text"  className="mb-3" placeholder="firstname:" onChange={(event)=>setFirstName(event.target.value)}/> <br />
                <input type="text"  className="mb-3" placeholder="lastname:" onChange={(event)=>setLastName(event.target.value)}/> <br />
                <input type="text"  className="mb-3" placeholder="email:" onChange={(event)=>setEmail(event.target.value)}/> <br />
                <h6 className="text-muted"> We'll never share your email with anyone else.</h6> <br/>
                <input type="text"  className="mb-3" placeholder="password:" onChange={(event)=>setPassword(event.target.value)}/> <br />
                <input type="text"  className="mb-3" placeholder="confirm your password:" onChange={(event)=>setConfirmPassword(event.target.value)}/> <br />
                { /*<input type="submit" value="Register now"/><br /> */}
                <Button variant="primary" type="submit">
          Register now
        </Button>
            </form>
            <p1>You can also register with: </p1> <br />
            <a href="http://localhost:8080/auth/google">Google</a> <br />
            <a href="http://localhost:8080/auth/facebook">Facebook</a> <br />
        </div>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    );
}


export default Register
