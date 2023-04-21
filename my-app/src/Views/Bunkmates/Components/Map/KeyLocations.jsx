import { Card, Typography, CardContent, Tooltip, IconButton } from "@mui/material/"
import { useEffect, useState } from "react";
import { OVERLAY_MOUSE_TARGET, OverlayViewF, DistanceMatrixService } from "@react-google-maps/api";
import { MapEducationMarker } from "./MapMarkers";
import { FaBus, FaBusAlt, FaWalking } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import { BsFillCarFrontFill } from "react-icons/bs";
import { BiCycling } from "react-icons/bi"
import { RiCloseCircleFill } from "react-icons/ri";

//Retrieve Key Locations 
export default function RetrieveKeyLocations({ setKeyLocationPins, coordinates, setZoom, setCenter, setMapProfileCard, request, }) {

  /*
  ---Hierarchical Structure---
  
  SingleMapCard.jsx & GroupMapCard.jsx
      |
      -->RetrieveKeyLocations.jsx
  */

  console.log('keyLocations rerendered')

  const placesRequest = {
    location: new window.google.maps.LatLng(coordinates),
    radius: '1000',
    types: ['store'],
  };

  const container = document.getElementById('results');

  const service = new window.google.maps.places.PlacesService(container);
  service.nearbySearch(placesRequest, callback);

  function callback(results, status) {

    if (status == window.google.maps.places.PlacesServiceStatus.OK) {

      const storedLocations = []
      const storedCoordinates = []
      for (var i = 0; i < results.length; i++) {
        const lat = results[i].geometry.location.lat();
        const lng = results[i].geometry.location.lng();
        //console.log(lat, lng)
        //calcRoute({ lat, lng })
        storedLocations.push(results[i])
        storedCoordinates.push({ lat: lat, lng: lng })
      }


      setMapProfileCard(null)
      setZoom(16)
      setKeyLocationPins(storedLocations)
      setCenter({ lat: request.idealLocation[0], lng: request.idealLocation[1] })
    }

  }




  /*
  //might use if the future to get even more detail about the establishment
  service.getDetails({ placeId: results[i].place_id }, function (place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log(place);
      }
  })
  */



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


//Displays markers on the map of the nearby key locations
//Parent Component for KeyLocationInfoCard
export function KeyLocationsMarkers({ keyLocationPins, center }) {

  /*
  ---Hierarchical Structure---
  
  Bunkmates.js
      |
      -->KeyLocationsMarkers.jsx
  */

  //Stores key location data
  const [keyLocationData, setKeyLocationData] = useState('');
  //THIS MAKES TOO MANY REQUESTS WHEN FETCHING PHOTO URLS, NEED TO FIX SOON

  //clicking the x button in keylocationinfocard closes the infocard
  const handleHideData = () => {
    setKeyLocationData(null)
  }

  return (
    <>
      <KeyLocationInfoCard keyLocationData={keyLocationData} center={center} onClick={handleHideData} />
      {keyLocationPins ? keyLocationPins.map((locationData) => {

        const handleShowData = () => {
          setKeyLocationData(locationData)
        }

        return (
          <OverlayViewF
            key={locationData.place_id}
            position={{ lat: locationData.geometry.location.lat(), lng: locationData.geometry.location.lng() }}
            styles={{ background: 'DarkGray', color: 'white', }}
            mapPaneName={OVERLAY_MOUSE_TARGET}>
            <MapEducationMarker onMouseEnter={handleShowData} />
          </OverlayViewF >
        )
      }) : ""}
    </>
  )
}


//Displays the name and address of the establishment in a card
//Child Component of KeyLocationsMarkers 
export function KeyLocationInfoCard({ keyLocationData, center, onClick }) {

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [travelMode, setTravelMode] = useState(0);

  const travelModes = [
    ['WALKING', <FaWalking style={{ margin: '0px 5px 0px 0px' }} />],
    ["DRIVING", <BsFillCarFrontFill style={{ margin: '0px 5px 0px 0px' }} />],
    ['TRANSIT', <FaBusAlt style={{ margin: '0px 5px 0px 0px' }} />],
    ['BICYCLING', <BiCycling style={{ margin: '0px 5px 0px 0px' }} />],
  ]

  const handleIncrementCount = () => {
    if (travelMode < 3) {
      setTravelMode(travelMode + 1)
    } else {
      setTravelMode(0)
    }
  }

  const handleDecrementCount = () => {
    if (travelMode > 0) {
      setTravelMode(travelMode - 1)
    } else {
      setTravelMode(3)
    }
  }

  if (keyLocationData) {
    const lat = keyLocationData.geometry.location.lat();
    const lng = keyLocationData.geometry.location.lng();
    const destinationCoordinates = { lat: lat, lng: lng }



    const locationDetails = {
      container: { width: '400px', height: '125px', borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', right: '60px', display: 'flex', alignItems: 'flex-start' },
      postHeader: { width: '400px', display: 'flex', width: '100%', padding: '15px', flexDirection: 'column', position: 'absolute' },
      imgContainer: { width: '400px', display: 'flex', justifyContent: 'flex-end' }
    }

    return (
      <Card sx={locationDetails.container}> <CardContent sx={locationDetails.postHeader}>
        <Typography noWrap variant="h5" color="text.primary" sx={{ color: 'white', fontWeight: '700', zIndex: 4, width: '250px', padding: '5px 10px 5px 10px' }} align="left">{keyLocationData.name}</Typography>
        <Typography noWrap variant="h5" color="text.secondary" sx={{ color: 'grey', fontSize: '18px', zIndex: 4, width: '250px', padding: '0px 10px 0px 10px' }} align="left">{keyLocationData.vicinity} </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <Typography noWrap variant="h5" color="text.primary" sx={{ color: 'white', fontSize: '18px', zIndex: 4, padding: '0px 5px 0px 5px', display: 'flex', alignItems: 'center' }} align="left">
            <Tooltip arrow title="Previous Travel Mode">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RxTriangleLeft size={20} style={{ cursor: 'pointer', height: "100%" }} onClick={handleDecrementCount} />
              </div>
            </Tooltip>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {travelModes[travelMode][1]}
              {distance}
            </div>
          </Typography>
          <div style={{ padding: '5px' }}>
            <Divider orientation="vertical" sx={{ backgroundColor: "white", height: '100%', }} />
          </div>
          <Typography noWrap variant="h5" color="text.primary" sx={{ color: 'white', fontSize: '18px', zIndex: 4, padding: '0px 10px 0px 5px' }} align="left"><div style={{ display: 'flex', alignItems: 'center', }}>
            {duration}
            <Tooltip arrow title="Next Travel Mode">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RxTriangleRight size={20} style={{ cursor: 'pointer', height: "100%" }} onClick={handleIncrementCount} />
              </div>
            </Tooltip>
          </div>
          </Typography>
        </div>
        <DistanceMatrixService
          options={{
            destinations: [destinationCoordinates],
            origins: [center],
            travelMode: travelModes[travelMode][0],
          }}
          callback={(response) => { setDistance(response.rows[0].elements[0].distance.text); setDuration(response.rows[0].elements[0].duration.text) }}
        />
      </CardContent>
        <div>
          <div style={locationDetails.imgContainer}>
            {/* See css file more styling*/}
            <div className="img-gradient" >
              <div style={{ zIndex: 1, position: 'absolute', right: '0px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClick}>
                  <RiCloseCircleFill size={30} style={{ color: 'white', }} />
                </IconButton>
              </div>
              {keyLocationData.photos
                ? <img style={{ width: '200px', height: '125px', }} src={keyLocationData.photos[0].getUrl()} />
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

