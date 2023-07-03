import { createContext, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";


export const BunkmatesContext = createContext(null)

export default function BunkmatesProvider({ children }) {

  const libraries = ["places"];
  //state management for what profile card is shown on the bunkmates page
  const [mapProfileCard, setMapProfileCard] = useState(null)

  //state management for where to center the google maps page
  const [center, setCenter] = useState({ lat: 43.642075, lng: -79.385981 });
  //can be used to rerender components
  const [rerender, setRerender] = useState(false);
  //evaluate whether map page has been loaded or not
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })
  const [click, setClick] = useState(false);
  //state management for the zoom level of the map
  const [zoom, setZoom] = useState(15)
  //store the key locations 
  const [keyLocationPins, setKeyLocationPins] = useState('');

  return (
    <BunkmatesContext.Provider
      value={{
        isLoaded,
        loadError,
        mapProfileCard,
        setMapProfileCard,
        center,
        setCenter,
        rerender,
        setRerender,
        click,
        setClick,
        zoom,
        setZoom,
        keyLocationPins,
        setKeyLocationPins,
      }}>
      {children}
    </BunkmatesContext.Provider>
  )

}