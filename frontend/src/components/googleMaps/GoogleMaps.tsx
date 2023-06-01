import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";
import { GoogleMapsI } from "../../interfaces/interfaces";
import { DefaultTheme } from "./GoogleTheme";

const defaultOptions = {
  styles: DefaultTheme,
};

function GoogleMaps({ selected, setAddress }: GoogleMapsI) {
  const mapRef = React.useRef(undefined);
  
  const markers = [
    {
      name: "Address User",
      location: selected ?? { lat: 45, lng: 45 },
      draggable: true,
    },
    {
      name: "Shop Address",
      location: { lat: 52, lng: 52 },
      draggable: false,
    },
  ];

  const onLoad = React.useCallback(function callback(map: any) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const containerStyle = {
    width: "100%",
    height: "20rem",
  };

  const handleSelect = async (markerPosition: google.maps.LatLngLiteral) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: markerPosition }, (results, status) => {
      if (status === "OK" && results) {
        setAddress(results[1].formatted_address);
      }
    });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selected}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {markers.map((marker) => {
          return (
            <div key={marker.name}>
              <MarkerF
                position={marker.location}
                draggable={marker.draggable}
                onDragEnd={(e) => e.latLng && handleSelect(e.latLng.toJSON())}
              />
            </div>
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;
