import { createContext, useState } from "react";
import CreateRequestForm from "../../Views/Bunkmates/Components/Map/CreateRequestForm";
import { createRequest, createProfile, updateRequest, deleteRequest, getProfiles, deleteProfile } from "../../api";
import { useNavigate } from "react-router";
import { useJsApiLoader } from "@react-google-maps/api";

export const BunkmatesContext = createContext(null)
export const BuildUserContext = createContext(null)

export default function MapProvider({ children }) {
  const navigate = useNavigate()

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

  const requestHandleSubmit = async (formData) => {
    //record values in backend
    try {
      const response = await createRequest(formData);
      console.log(response);
    } catch (error) {
      console.log("An error has occured: ", error)
    }
  }

  const profileHandleSubmit = (data) => {
    try {
      //const response = await createProfile(data);
      return createProfile(data);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const profileHandleUpdate = async (profile) => {
    try {
      await deleteProfile()
      return createProfile(profile)
    } catch (error) {
      console.log(error)
    }
  }

  const requestHandleUpdate = async (id, userRequestData) => {
    try {
      //superior method
      await deleteRequest()
      //const response = await createRequest(userRequestData)
      return createRequest(userRequestData);
      //console.log(response)
    } catch (error) {
      console.log("An error has occured: ", error)
    }

    /*
    try {
      const response = await updateRequest(id, formData)
      console.log(response)
    } catch (error) {
      console.log("An error has occured: ", error)
    }
    */

  }

  const profileHandleRetrieval = async (profileArray) => {
    try {
      const response = getProfiles(profileArray)
      console.log(response)
      return response
    } catch (error) {
      console.log("An error has occurred")
    }
  }





  return (
    <BunkmatesContext.Provider value={{ isLoaded, loadError, mapProfileCard, setMapProfileCard, center, setCenter, rerender, setRerender, click, setClick }}>
      <BuildUserContext.Provider value={{ profileHandleSubmit, profileHandleUpdate, requestHandleSubmit, requestHandleUpdate, profileHandleRetrieval }}>
        {children}
      </BuildUserContext.Provider>
    </BunkmatesContext.Provider>
  )

}