import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Map from "../../components/Map/Map"
import Geocode from "react-geocode";
import Dividers from "../DividersUpdate/Dividers";
import Dispatch from "../Dispatch/Dispatch2";

const axios = require('axios')
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion("isr");
Geocode.setLocationType("ROOFTOP");

function Deliveries() {
    let [dividersList, setDividersList] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [selectedId, setSelectedId] = useState(-1);



    useEffect(() => {
        axios.get("http://localhost:8080/distributors").then(x => setDividersList(x.data))
    }, [selectedId])

    useEffect(() => {
        axios.get('http://localhost:8080/deliveriestoday2').then((deliveries) => {
        console.log(deliveries.data)
        setDeliveries(deliveries.data)
        })
      }, [selectedId])


    let transformation = (deliveries, event) => {
        console.log(deliveries);
        event.preventDefault();
        deliveries.forEach(del => {
            console.log(del.address+", "+del.city)
        Geocode.fromAddress(del.address+", "+del.city).then(
        (response) => {
            console.log(response)
            let { lat, lng } = response.results[0].geometry.location;
            console.log(lat)
            setLatitude((latitude) => [...latitude, lat])
            setLongitude((longitude) => [...longitude, lng])
        },
        (error) => {
            console.error("error parsing:"+error);
        }
        )})

    };

    return(
        <div>
        <div>
        {deliveries.length === 0 ? (
        <h3>No deliveries for today</h3>
      ) : (
          <div>
        <h3>There are {deliveries.length} deliveries for today</h3>
        <h3 style={{float: "right"}}>
        The deliverers:
        <Dividers dividersList={dividersList} setSelectedId={setSelectedId}/>
        </h3>
        <input type="button" onClick={(event) => transformation(deliveries, event)} value="Load the map" />
        <Dispatch dividersList={dividersList} deliveries={deliveries} latitude={latitude} longitude={longitude}/>
        <Map deliveries={deliveries} latitude={latitude} longitude={longitude}/>
        </div>
      )}
      </div>
         </div>
    )
}

export default Deliveries