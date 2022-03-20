import React from 'react'
import styles from "./Background.module.css"
import Map, {Marker, NavigationControl}  from 'react-map-gl';
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";



export default function Background() {
  const MY_ACCESS_TOKEN = "pk.eyJ1IjoidGhlb3BoaWxvLW9saXZlaXJhIiwiYSI6ImNsMHlwaGd4ZDBkN3EzamxtOG56M2JzaTMifQ.TK0gf5mmWWnRqDXSVDjN1w"
  return (

    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{position: "fixed", top: 0, bottom: 0, left: 0,  width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={MY_ACCESS_TOKEN}

    >
       <Marker longitude={-122,4} latitude={37.8} anchor="center" color="#ffff" >
      <PushPin2FillIcon color="white" />
    </Marker>
    <NavigationControl position="bottom-left" />

      </Map>
  
  )
}
