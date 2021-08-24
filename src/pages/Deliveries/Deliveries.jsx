import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Map from "../../components/Map/Map"
import Geocode from "react-geocode";

const axios = require('axios')


function Deliveries() {
    const [deliveries, setDeliveries] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/products').then((deliveries) => {
          setDeliveries(deliveries.data)
          console.log(deliveries.data)
        })
      }, [])



    let transformation = () => Geocode.fromAddress(deliveries).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );

    return(
        <div>
        <h1>Dispatch deliveries</h1>
        {deliveries.length === 0 ? (
        <h3>No deliveries for today</h3>
      ) : (
          <div>
        <h3>There are {deliveries.length} deliveries for today</h3>
        Convert the address to lat-long:
        <input type="button" onClick={transformation} value="Convert" />
        <Map deliveries={deliveries}/>
        </div>
      )}
         </div>
    )
}

export default Deliveries