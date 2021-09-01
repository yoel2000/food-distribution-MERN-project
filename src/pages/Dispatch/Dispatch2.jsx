import React from "react"
import { useState } from "react"
import { useHistory } from 'react-router';
const axios = require('axios')


function Dispatch(props) {

    const [deliverTo, setDeliverTo] = useState([])
    let [address, setAddress] = useState('')
    let history = useHistory();

    let dispatch = (event, dividersList, deliveries, latitude, longitude) => {
        event.preventDefault()
        console.log(dividersList);
        console.log(deliveries)
        axios.post("http://localhost:8080/dispatch", {
                'dividersList': dividersList,
                'deliveries': deliveries,
                'latitude': latitude,
                'longitude': longitude,
            }).then((res) => {
                console.log(res.data.idxs);
                dividersList.map((d, id) => {

                    for (let i = 0; i < res.data.idxs.length; i++) {
                        if (res.data.idxs[i] === id) {
                            address = deliveries[i].address+", "+deliveries[i].city;
                            console.log(address)
                            const obj = {
                                'address': address,
                                'name': d.name
                            }
                            deliverTo.push(obj)
                        }
                    }
                })
                console.log(deliverTo)
                history.push({
                    pathname: 'dashboard',
                    state: deliverTo
                })
            })

    }

    return(
        <div>
            <input type="button" onClick={(event) => dispatch(event, props.dividersList, props.deliveries, props.latitude, props.longitude)} value="Dispatch" />
        </div>
    )
}

export default Dispatch