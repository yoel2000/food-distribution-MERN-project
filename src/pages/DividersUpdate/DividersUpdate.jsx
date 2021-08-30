import React from "react"
import { useState } from "react"
import AddForm from "./AddForm";
import "./DividersUpdate.css";
import { useEffect } from "react";
import UpdateForm from "./UpdateForm";
import Dividers from "./Dividers";

const axios = require('axios')


function DividersUpdate() {


    let [dividersList, setDividersList] = useState([])
    let [formVisibility, setFormVisibility] = useState(false)

    const [selectedId, setSelectedId] = useState(-1);



    useEffect(() => {
        axios.get("http://localhost:8080/distributors").then(x => setDividersList(x.data))
    }, [selectedId])

    let openAddingForm = () => {
        setFormVisibility(true)
    }

    let addDivider = (event, obj) => {
        event.preventDefault()
        setDividersList([...dividersList, obj])
        console.log(dividersList)
        axios.put("http://localhost:8080/addDistributor", {
            'email': obj.email,
            'name': obj.name,
            'telephone': obj.telephone,
        }).then((res) => {
            console.log(res.data);
        })

    }

    return (
        <div className="container">
            <div>
            <input type="button" onClick={openAddingForm} value="+" />
            {formVisibility ? <AddForm addDivider={addDivider} dividersList={dividersList} /> : null}
            </div>
            <Dividers dividersList={dividersList} setSelectedId={setSelectedId}/>
            <UpdateForm dividersList={dividersList} selectedId={selectedId} setDividersList={setDividersList}/>


        </div>
    )
}




export default DividersUpdate