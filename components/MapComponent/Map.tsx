import React from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

interface MapPropTypes {
  selected: any;
  center: {
    lat: number,
    lng: number,
  };
}

const Map: React.FC<MapPropTypes> = ({ selected, center }) => {

  const mapContainerStyle = {
    width: "500px",
    height: "500px",
    borderRadius: "0 0.75rem 0.75rem 0",
  };
  
  return (
    <GoogleMap zoom={10} center={center} mapContainerStyle={mapContainerStyle}>
      {selected && <Marker position={selected} />}
    </GoogleMap>
  );
};

export default Map;