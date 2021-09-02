import React, { useEffect } from "react"
import { useState } from "react"
import { useHistory } from 'react-router';
const axios = require('axios')


function Dispatch(props) {

    const [deliverTo, setDeliverTo] = useState([])
    let [address, setAddress] = useState('')
    let [userList, setUserList] = useState([])
    let history = useHistory();

    useEffect(x=>{
        axios.get('http://localhost:8080/users').then(x=>setUserList(x.data))
    },[])


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
                dividersList.forEach((d, id) => {
                    for (let i = 0; i < res.data.idxs.length; i++) {
                        if (res.data.idxs[i] === id) {
                            axios.put('/distributions/'+deliveries[i]._id,{...deliveries[i],distributorId:d._id})
                            address = deliveries[i].address+", "+deliveries[i].city;
                            console.log(address)
                            const obj = {
                                'address': address,
                                'name': d._id
                            }
                            deliverTo.push(obj)
                        }
                    }
                })
                console.log("deliverto:")
                console.log(deliverTo)
                history.push({
                    pathname: 'dashboard',
                    state: deliverTo
                })
            })

    }

    return(
        <div>
            <input type="button" onClick={(event) => dispatch(event, userList, props.deliveries, props.latitude, props.longitude)} value="determine distribution areas" />
        </div>
    )
}

export default Dispatch