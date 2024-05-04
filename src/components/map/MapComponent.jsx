import React from 'react';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MapComponent = ({ lat, lng }) => {
  const defaultProps = {
    center: {
      lat,
      lng
    },
    zoom: 20
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAPS_API_KEY
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <FaMapMarkerAlt
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          className="text-4xl text-blue-500"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
