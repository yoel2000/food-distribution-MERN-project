import React from 'react'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
// import { Button } from "react-bootstrap";
import './Register.css';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { isValid } from 'date-fns';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

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
    <div className="App">
        <Grid>
          <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "auto", marginTop:"120px" }}>
            <CardContent>
              <Typography style={{color:"PowderBlue"}} gutterBottom variant="h4">
                Register
            </Typography>
              <form onSubmit={mySubmitHandler}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField placeholder="Enter first name" label="First Name" variant="outlined" onChange={(event) => setFirstName(event.target.value)}
                    fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField placeholder="Enter last name" label="Last Name" variant="outlined" onChange={(event) => setLastName(event.target.value)}
                    fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)}
                    fullWidth required />
                  <h6 className="text-muted"> We'll never share your email with anyone else.</h6> <br />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField type="password" placeholder="Enter your password" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)}
                    fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField type="password" placeholder="Confirm your password" label="COnfirm Password" variant="outlined" onChange={(event) => setConfirmPassword(event.target.value)}
                    fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={{color:"SkyBlue", backgroundColor:"white"}} fullWidth>Register</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
  );
}


export default Register
