import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Map from "../../components/Map/Map"
import Geocode from "react-geocode";
import Dividers from "../DividersUpdate/Dividers";
import Dispatch from "../Dispatch/Dispatch2";
import { Checkbox } from "@material-ui/core";

const axios = require('axios')
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion("isr");
Geocode.setLocationType("ROOFTOP");

function Deliveries_user() {
    let [distributorList, setDistributorList] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [selectedId, setSelectedId] = useState(-1);
    const [user,setUser]=useState();

    useEffect(() => {
        axios.get("http://localhost:8080/users").then(x => setDistributorList(x.data))
    }, [user])

    useEffect(() => {
        axios.get('http://localhost:8080/deliveriestoday/'
        +JSON.parse(sessionStorage.getItem('cur_user'))?._id).then((deliveries) => {
            console.log(deliveries.data)
            transformation(deliveries.data)
            setDeliveries(deliveries.data)
        })
    }, [])


    let transformation = (deliveries) => {
        console.log(deliveries);
        deliveries.forEach(del => {
            console.log(del.address + ", " + del.city)
            Geocode.fromAddress(del.address + ", " + del.city).then(
                (response) => {
                    console.log(response)
                    let { lat, lng } = response.results[0].geometry.location;
                    console.log(lat)
                    setLatitude((latitude) => [...latitude, lat])
                    setLongitude((longitude) => [...longitude, lng])
                },
                (error) => {
                    console.error("error parsing:" + error);
                }
            )
        })

    };

    let getName = () => {
        let user = JSON.parse(sessionStorage.getItem('cur_user'));
        let name = "";
        if (user) {
            if (user.local)
                name = user.local.firstname + user.local.lastname;
            else if (user.google)
                name = user.google.name;
            else if (user.facebook)
                name = user.facebook.name;
        }
        return name;
    }

    let markComplete=(e,distribution)=>{
            axios.put('/distributions/'+distribution._id,{...distribution,isCompleted:e.target.checked}) 
    }

    return (
        <div>
            <div>
                {deliveries.length === 0 ? (
                    <h3>No deliveries for today</h3>
                ) : (
                    <div>

                        <h3>Hello {getName()}, You have {deliveries.length} deliveries to distribute today</h3>
                        <b>mark beside any completed place, so the manager knows you have completed the task</b><br/>
                        The places are: 
                        <ul>{deliveries.map((x,key)=><li key={key}>{x.address+", "+x.city} <Checkbox value="check" onChange={e=>markComplete(e,x)}/></li>)}</ul>
                        <Map deliveries={deliveries} latitude={latitude} longitude={longitude} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Deliveries_user