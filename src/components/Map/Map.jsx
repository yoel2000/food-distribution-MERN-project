import React from "react"
import './index.css';
import { useState } from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import { useEffect } from "react"
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion("isr");
Geocode.setLocationType("ROOFTOP");

const axios = require('axios')
const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({deliveries, latitude, longitude, coordinates}) {

    const center = {
      lat: Number(latitude[0]),
      lng: Number(longitude[0]),
    };

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [address, setAddress] = useState('')


    const onMapClick = React.useCallback((e) => {
      console.log(coordinates)
    for (let i = 0; i < coordinates?.length; i++) {
      setMarkers((current) =>
      [
        ...current,
        {
          lat: coordinates[i].lat,
          lng: coordinates[i].lng,
          time: new Date(),
          color: coordinates[i].isCompleted ? "green":"red",
        },
      ])
    }
  });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(12);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    return (
      <div>
        <input type="button" onClick={(event) => onMapClick(event)} value="mark the places in the map" />
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          // onClick={onMapClick}
          onLoad={onMapLoad}
        >

        {markers.map((marker, key) => (
          <Marker key={key}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              console.log(markers);
              setSelected(marker);
            }}
            icon= {marker.color=="green"? "http://maps.google.com/mapfiles/ms/icons/green-dot.png":undefined}
            />
        ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                {

                }


                <p>{formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    );
  }

  function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/locate_me.jpg" alt="locate me" width="50%" height="50%"/>
      </button>
    );
  }

  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 31, lng: () => 35 },
        radius: 50 * 1000,
      },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };

    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search a location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }

  export default Map