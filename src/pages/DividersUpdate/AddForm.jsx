import React from "react"
import { Button } from "react-bootstrap"
import { useState } from "react"

function AddForm(props) {
    let [telephone, setTelephone] = useState('')
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')

    return (
        <div>
            <form onSubmit={(e) => props.addDivider(e, { telephone:telephone, name:name, email:email })}>
                Telephone:
                <input type="text" placeholder="telephone" onChange={(event) => setTelephone(event.target.value)} /> <br />
                Name:
                <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} /> <br />
                Email:
                <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} /> <br /><br />
                <Button type="submit"> Add distributor</Button>
            </form>


        </div>
    )
}

export default AddForm