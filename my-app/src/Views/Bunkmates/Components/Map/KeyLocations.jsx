import mapStyles from '../../../../data/mapStyles.json'
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