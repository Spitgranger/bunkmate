import { Card, Typography, CardContent } from "@mui/material/"
import { useState } from "react";
import { OVERLAY_MOUSE_TARGET, OverlayViewF } from "@react-google-maps/api";
import { MapEducationMarker } from "./MapMarkers";

//Retrieve Key Locations 
export default function RetrieveKeyLocations({ setKeyLocationPins, coordinates, setZoom, setCenter, setMapProfileCard, request }) {

  //retrieve locations data from google maps api
  console.log('keyLocations rerendered')



  const placesRequest = {
    location: new window.google.maps.LatLng(coordinates),
    radius: '500',
    types: ['school'],
  };

  const container = document.getElementById('results');

  const service = new window.google.maps.places.PlacesService(container);
  service.nearbySearch(placesRequest, callback);

  /*
  //might use if the future to get even more detail about the establishment
  service.getDetails({ placeId: results[i].place_id }, function (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(place);
      }
  })
  */



  function callback(results, status) {

    if (status == window.google.maps.places.PlacesServiceStatus.OK) {

      const storedLocations = []
      for (var i = 0; i < results.length; i++) {
        const lat = results[i].geometry.location.lat();
        const lng = results[i].geometry.location.lng();
        //console.log(lat, lng)
        //calcRoute({ lat, lng })
        storedLocations.push(results[i])
      }
      setMapProfileCard(null)
      setZoom(16)
      setKeyLocationPins(storedLocations)
      setCenter({ lat: request.idealLocation[0], lng: request.idealLocation[1] })
    }
  }

  /*
  //Did not work as expected
  //google maps directions
  var directionsService = new window.google.maps.DirectionsService();
  var directionsRenderer = new window.google.maps.DirectionsRenderer();
  var chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 7,
    center: chicago
  }
  var map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
  */
  /*
  function calcRoute({ lat, lng }) {
    var start = coordinates
    var end = { lat: lat, lng: lng }
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    console.log(request)
    directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }
  */

}



//Displays the name and address of the establishment in a card
export function KeyLocationInfoCard({ keyLocationData }) {


  const locationDetails = {
    container: { width: '400px', height: '125px', borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', right: '60px', display: 'flex', alignItems: 'flex-start' },
    postHeader: { width: '400px', display: 'flex', width: '100%', padding: '15px', flexDirection: 'column', position: 'absolute' },
    imgContainer: { width: '400px', display: 'flex', justifyContent: 'flex-end' }
  }

  if (keyLocationData) {
    return (
      <Card sx={locationDetails.container}> <CardContent sx={locationDetails.postHeader}>
        <Typography noWrap variant="h5" color="text.primary" sx={{ color: 'white', fontWeight: '700', zIndex: 4, width: '370px', padding: '10px' }} align="bottom">{keyLocationData.name}</Typography>
        <Typography noWrap variant="h5" color="text.secondary" sx={{ color: 'grey', fontSize: '18px', zIndex: 4, width: '370px', padding: '0px 10px 0px 10px' }} align="bottom">{keyLocationData.vicinity} </Typography>
      </CardContent>
        <div>
          <div style={locationDetails.imgContainer}>
            {/* See css file more styling*/}
            <div className="img-gradient" >
              {keyLocationData.photos ?
                <img style={{ width: '200px', height: '125px', }} src={keyLocationData.photos[0].getUrl()} />
                : ""}
            </div>
          </div>
        </div>
      </Card>
    )
  } else {
    return ""
  }

}


//Displays markers on the map of the nearby key locations
export function KeyLocationsMarkers({ keyLocationPins }) {

  //Stores key location data
  const [keyLocationData, setKeyLocationData] = useState('');
  //THIS MAKES TOO MANY REQUESTS WHEN FETCHING PHOTO URLS, NEED TO FIX SOON

  return (
    <>
      <KeyLocationInfoCard keyLocationData={keyLocationData} />
      {keyLocationPins ? keyLocationPins.map((location) => {
        return (
          <OverlayViewF
            key={location.place_id}
            position={{ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() }}
            styles={{ background: 'DarkGray', color: 'white', }}
            mapPaneName={OVERLAY_MOUSE_TARGET}>
            <MapEducationMarker location={location} setKeyLocationData={setKeyLocationData} />
          </OverlayViewF >
        )
      }) : null}
    </>
  )
}
