import React, { useState, useEffect, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { BunkmatesContext } from '../../../../Components/GlobalStateManagement/UserContext';

export const KeyLocations = (props) => {
  const [universities, setUniversities] = useState([]);
  const { center } = useContext(BunkmatesContext)

  useEffect(() => {
    const { google } = props;
    const service = new google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: new google.maps.LatLng(37.7749, -122.4194), // San Francisco coordinates
      radius: '5000',
      type: ['university'],
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setUniversities(results);
      }
    });
  }, [props]);

  const mapRef = React.createRef();

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={12}
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {universities.map((university) => (
          <Marker
            key={university.id}
            lat={university.geometry.location.lat()}
            lng={university.geometry.location.lng()}
            text={university.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ text }) => <div>{text}</div>;

export default googleapiwrapper({
  apikey: process.env.react_app_google_maps_api_key,
})(map);