import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"

const axios = require('axios')

function UpdateUser(props) {

    let selected = props.userList.filter(x => x.id == props.selectedId)
    let entries = Object.entries(selected[0] ? selected[0] : {})

    const [values, setValues] = useState({})

    let updateUser = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8080/users/" + values.id, values).then((res) => {
            props.setUserList(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        console.log(entries)
        entries.map(x => setValues((values) => ({ ...values, [x[0]]: x[1] })))
    }, [props.selectedId]);


    return (
        <div>
            <form onSubmit={updateUser}>
                {(entries.length > 0) ? entries.filter(x => x[0] != "id").map((x, key) =>
                    <div key={key}>
                        <label>{x[0]}:</label>
                        <input value={values[x[0]]} onChange={(e) => setValues({ ...values, [x[0]]: e.target.value })} type="text" />
                    </div>) : null}  <br />
                <Button type="submit"> Update distributor</Button>
            </form>
        </div>
    )
}

export default UpdateUser