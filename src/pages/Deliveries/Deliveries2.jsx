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
    let [distributorList, setDistributorList] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [latitude, setLatitude] = useState([])
    const [longitude, setLongitude] = useState([])
    const [selectedId, setSelectedId] = useState(-1);
    const [coordinates, setCoordinates] = useState([])




    useEffect(() => {
        axios.get("http://localhost:8080/users").then(x => setDistributorList(x.data))
    }, [selectedId])

    useEffect(() => {
        axios.get('http://localhost:8080/deliveriestoday2').then((deliveries) => {
            console.log(deliveries.data)
            transformation(deliveries.data)
            setDeliveries(deliveries.data)
        })
    }, [selectedId])


    let transformation = async (deliveries) => {
        console.log("deliveries");
        console.log(deliveries);
        for (let i = 0; i < deliveries.length; i++) {
            let del = deliveries[i];
            console.log(del.address + ", " + del.city)
            let response= await Geocode.fromAddress(del.address + ", " + del.city);
            console.log(response)
            let { lat, lng } = response.results[0].geometry.location;
            console.log(lat)
            setCoordinates(old=>[...old,{lat:lat,lng:lng,isCompleted:del.isCompleted}])
            setLatitude((latitude) => [...latitude, lat])
            setLongitude((longitude) => [...longitude, lng])
        }
    };

    return (
        <div>
            <div>
                {deliveries.length === 0 ? (
                    <h3>No deliveries for today</h3>
                ) : (
                    <div>
                        <h3 style={{ float: "right" }}>
                            The distributors:
                            <Dividers dividersList={distributorList} setSelectedId={setSelectedId} />
                        </h3>
                        <h3>There are {deliveries.length} deliveries for today</h3>

                        The places are:
                        <ol>{deliveries.map((x, key) => <li key={key}>{x.address + ", " + x.city} </li>)}</ol>


                        <Dispatch dividersList={distributorList} deliveries={deliveries} latitude={latitude} longitude={longitude} />
                        <Map deliveries={deliveries} coordinates={coordinates} latitude={latitude} longitude={longitude} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Deliveries