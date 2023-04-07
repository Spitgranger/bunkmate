import { Card, Typography, IconButton, Tooltip, CircularProgress, CardMedia, CardContent } from "@mui/material/"
import { formatContext } from "../../../../Components/GlobalStateManagement/FormatContext";
import { useContext } from "react";


const KeyLocations = ({ setKeyLocationPins, coordinates, setZoom, setCenter, setMapProfileCard, request }) => {


  console.log('keyLocations rerendered')



  const placesRequest = {
    location: new window.google.maps.LatLng(coordinates),
    radius: '500',
    types: ['store'],
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

  /*
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

  //Did not work as expected
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


export default KeyLocations


export function KeyLocationDetails({ keyLocationData }) {

  const { capitalizedName } = useContext(formatContext);

  const locationDetails = {
    container: { borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', width: '400px', right: '60px', display: 'flex', alignItems: 'flex-start' },
    postHeader: { display: 'flex', width: '100%', padding: '15px 0px 15px 15px', flexDirection: 'column', position: 'absolute' },
  }

  if (keyLocationData) {
    return (
      <Card sx={locationDetails.container}>
        <CardContent sx={locationDetails.postHeader}>
          <Typography variant="h5" color="text.primary" sx={{ color: 'white', fontWeight: '700', zIndex: 4 }} align="top">{capitalizedName(keyLocationData.types[0])} | 0.57 km</Typography>
          <Typography noWrap variant="h6" color="text.primary" sx={{ color: 'white', fontSize: '18px', zIndex: 4 }} align="bottom">{keyLocationData.name}</Typography>
          <Typography noWrap variant="h6" color="text.secondary" sx={{ color: 'grey', fontSize: '16px', zIndex: 4 }} align="bottom">{keyLocationData.vicinity} </Typography>
        </CardContent>
        <div>
          <div style={{ width: '400px', display: 'flex', justifyContent: 'flex-end' }}>
            <div className="img-gradient" >
              <img style={{ width: '200px', height: '125px', }} src={keyLocationData.photos ? keyLocationData.photos[0].getUrl() : ""} />
            </div>
          </div>
        </div>
      </Card>
    )
  } else {
    return ""
  }

}