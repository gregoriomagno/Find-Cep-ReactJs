import React from 'react';
import {
  useLoadScript,
  Marker,
  GoogleMap
} from '@react-google-maps/api';

import '../styles/map.css';


// import {formatRelative} from "data-fns";
import mapStyles from '../styles/mapStyles';
import { propTypes } from 'react-bootstrap/esm/Image';

const libraries = ["places"];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapContainerStyle = {

  width: '75vw',
  height: '100vh',
}



const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,

}

export default function Map(props) {



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY_API,
    libraries
  });

  const [markers, setMarkers] = React.useState([{
    lat: 0,
    lng: 0,
    time: new Date(),
  }]);
  if (loadError) return "error loading maps"
  if (!isLoaded) {
    return "Loading Maps"
  }
  if (isLoaded && markers[0].lat != props.props.lat && markers[0].lng != props.props.lng) {
    setMarkers([{
      lat: props.props.lat,
      lng: props.props.lng,
      time: new Date(),
    }]);
  }

  return (

    <div className="Container">


      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{
          lat: props.props.lat,
        lng :props.props.lng }}

        options={options}
      >
        {
          markers.map((marker) => (
            <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}




      </GoogleMap>
    </div>)
}



