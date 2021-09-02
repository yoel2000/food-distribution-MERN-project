import React from "react"
import { useState } from "react"
import AddForm from "./AddForm";
import "./DividersUpdate.css";
import { useEffect } from "react";
import UpdateForm from "./UpdateForm";
import UserList from "./UserList";
import UpdateUser from "./UpdateUser";

const axios = require('axios')


function DistributorsUpdate() {


    let [userList, setUserList] = useState([])

    const [selectedId, setSelectedId] = useState(-1);

    useEffect(() => {
        axios.get("http://localhost:8080/users").then(res => setUserList(res.data))
    }, [selectedId])

    // let addDivider = (event, obj) => {
    //     event.preventDefault()
    //     setDistributorList([...dividersList, obj])
    //     console.log(dividersList)
    //     axios.put("http://localhost:8080/addDistributor", {
    //         'email': obj.email,
    //         'name': obj.name,
    //         'telephone': obj.telephone,
    //     }).then((res) => {
    //         console.log(res.data);
    //     })

    // }

    return (
        <div className="container">
            <UserList userList={userList} setSelectedId={setSelectedId}/>
            <UpdateUser userList={userList} selectedId={selectedId} setUserList={setUserList}/>
        </div>
    )
}




export default DistributorsUpdate