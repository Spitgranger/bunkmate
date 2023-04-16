import { createContext, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export const BunkmatesContext = createContext(null)

export default function BunkmatesProvider({ children }) {

  const libraries = ["places"];
  //state management for what profile card is shown on the bunkmates page
  const [mapProfileCard, setMapProfileCard] = useState(null)

  //state management for where to center the google maps page
  const [center, setCenter] = useState({ lat: 43.642075, lng: -79.385981 });
  //can be used to rerender components
  const [rerender, setRerender] = useState(false)
  //evaluate whether map page has been loaded or not
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })
  const [click, setClick] = useState(false);
  //state management for the zoom level of the map
  const [zoom, setZoom] = useState(15)
  //store the key locations 
  const [keyLocationPins, setKeyLocationPins] = useState('');


  const capitalizedName = (name) => {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}`
  };

  //stores the request and profile data in parent component, it also navigates and provides data to OtherProfile.jsx 
  const HandleViewOtherProfile = ({ data, content }) => {
    //data prop is referencing user's request, profiles, and posts to make nested map card profile viewer, createPost and postCard compatible as well
    return (
      <Tooltip title={`View ${capitalizedName(data.firstName ?? data.profile[0].firstName)}'s profile`} arrow>
        <Link
          to={"/otherprofile"}
          state={data}
          style={{ textDecoration: 'none' }}
        >
          {content}
        </Link>
      </Tooltip>
    )
  }


  return (
    <BunkmatesContext.Provider value={{ HandleViewOtherProfile, isLoaded, loadError, mapProfileCard, setMapProfileCard, center, setCenter, rerender, setRerender, click, setClick, zoom, setZoom, keyLocationPins, setKeyLocationPins, }}>
      {children}
    </BunkmatesContext.Provider>
  )

}