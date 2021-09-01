import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"

const axios = require('axios')

function UpdateDistribution(props) {

    let selected = props.distributionList.filter(x => x.id == props.selectedId)

    let entries = Object.entries(selected[0] ? selected[0] : {})

    const [values, setValues] = useState({})

    let updateDistribution = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8080/distributions2/" + values.id, {
            'name': values.name,
            'date': values.date,
            'city':values.city,
            'address': values.address,
            'id':  values.id
        }).then((res) => {
            props.setDistributionList(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        console.log(entries)
        entries.map(x => setValues((values) => ({...values, [x[0]]: x[1]})))
    }, [props.selectedId]);


    return (
        <div>
            <form onSubmit={updateDistribution}>
            {(entries.length > 0) ? entries.filter(x => x[0] != "id").map((x, key) =>
                <div key={key}>
                    <label>{x[0]}:</label>
                    <input value={values[x[0]]} onChange={(e) => setValues({...values, [x[0]]: e.target.value})} type="text" />
                </div>) : null}  <br/>
            <Button type="submit"> Update distribution</Button>
            </form>
        </div>
    )
}

export default UpdateDistribution