import React from "react"
import { useEffect } from "react"
import { useState } from "react"



function UpdateForm(props) {

    let selected = props.dividersList.filter(x => x.id == 0)
    let entries = Object.entries(selected[0] ? selected[0] : {})

    const [values, setValues] = useState({})

    useEffect(() => {
        console.log(entries)
        entries.map(x => setValues({...values, [x[0]]: x[1]}))
    }, [props.dividersList]);


    return (
        <div>
            {(entries.length > 0) ? entries.map(x =>
                <div>
                    <label>{x[0]}:</label>
                    <input value={values[x[0]]} onChange={(e) => setValues({...values, [x[0]]: e.target.value})} type="text" />
                </div>) : null}
        </div>
    )
}

export default UpdateForm