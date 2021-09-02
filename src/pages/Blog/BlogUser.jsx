import { Button, Input, TextareaAutosize, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '80ch',
        },
    },
}));

function BlogUser() {

    const [Post, setPost] = useState("Write Here Your Blog")
    const [posts, setPosts] = useState([])
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8080/posts").then(
            res => setPosts(res.data)
        )
    }, [])

    let mySubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/addpost", { body: Post }
        ).then((res) => {
            console.log(res.data);
        }).then(() => axios.get("http://localhost:8080/posts").then(
            res => setPosts(res.data)
        ))
    }

    const classes = useStyles();


    return (
        <div>
            
            <article>
                {posts.map((x, key) =>
                    <div key={key}>
                        <br/>
                        <h6>published at {new Date(x.createdAt).toLocaleDateString("en-US")}</h6>
                        <p >{x.body}</p><br/><br/>
                    </div>)}

            </article>


        </div>


    );
}

export default BlogUser