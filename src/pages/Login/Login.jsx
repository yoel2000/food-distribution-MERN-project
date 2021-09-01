import React, { useContext } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
// import { Button } from 'react-bootstrap';
import './Login.css';
import { UserContext } from '../../UserContext';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

const axios = require('axios')


function Login() {

    // yoel.bensoussan@gmail.com
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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
                sessionStorage.setItem('cur_user', JSON.stringify(res.data.user))
                history.push('/home_manager')
            }
        })

    }
    return (
        <div className="App" >
            <Grid>
                <Card style={{maxWidth: 1000, padding: "20px 5px", margin: "auto", marginTop:"120px" }}>
                    <CardContent>
                        <Typography style={{color:"PowderBlue"}} gutterBottom variant="h3">
                            Login
                        </Typography>
                        <form onSubmit={mySubmitHandler}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)}
                                    fullWidth required /> <br/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField type="password" placeholder="Enter password" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)}
                                    fullWidth required />
                                </Grid>
                                <Grid item xs={16}>
                                    <Button type="submit" variant="contained" style={{color:"SkyBlue", backgroundColor:"white"}} fullWidth>Login</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
    </div >
    );
}

export default Login