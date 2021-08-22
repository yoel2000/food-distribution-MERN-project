import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"

const axios = require('axios')

function UpdateForm(props) {

    let selected = props.dividersList.filter(x => x.id == props.selectedId)

    let entries = Object.entries(selected[0] ? selected[0] : {})

    const [values, setValues] = useState({})

    let updateDistributor = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8080/distributors/" + values.id, {
            'email': values.email,
            'name': values.name,
            'telephone': values.telephone,
            'id':  values.id
        }).then((res) => {
            props.setDividersList(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        console.log(entries)
        entries.map(x => setValues((values) => ({...values, [x[0]]: x[1]})))
    }, [props.selectedId]);


    return (
        <div>
            <form onSubmit={updateDistributor}>
            {(entries.length > 0) ? entries.filter(x => x[0] != "id").map((x, key) =>
                <div key={key}>
                    <label>{x[0]}:</label>
                    <input value={values[x[0]]} onChange={(e) => setValues({...values, [x[0]]: e.target.value})} type="text" />
                </div>) : null}  <br/>
            <Button type="submit"> Update distributor</Button>
            </form>
        </div>
    )
}

export default UpdateForm