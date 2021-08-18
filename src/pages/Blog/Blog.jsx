import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
const axios = require('axios')

function Blog() {

    const [addAPost, setAddAPost] = useState('')
    let history= useHistory();

    let mySubmitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8080/aaa"
        ).then((res)=>{
            console.log(res.data);
            history.push('/aaa')})

    }

    return(
        <div>
            <form onSubmit={mySubmitHandler}>
            <input type="text" className="mb-3" placeholder="add a post:" onChange={(event)=>setAddAPost(event.target.value)}/> <br />


            </form>
        </div>
    );
}

export default Blog