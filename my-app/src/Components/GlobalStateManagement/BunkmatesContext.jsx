import { createContext, useState } from "react";
import CreateRequestForm from "../../Views/Bunkmates/Components/CreateRequestForm";
import { createRequest, createProfile, updateRequest, deleteRequest, getProfiles } from "../../api";
import { useNavigate } from "react-router";

export const BunkmatesContext = createContext(null)
export const BuildUserContext = createContext(null)

export default function MapProvider({ children }) {
  const navigate = useNavigate()

  //state management for what profile card is shown on the bunkmates page
  const [mapProfileCard, setMapProfileCard] = useState(null)

  //state management for where to center the google maps page
  const [center, setCenter] = useState({ lat: 43.642075, lng: -79.385981 });

  const requestHandleSubmit = async (formData) => {
    //record values in backend
    try {
      const response = await createRequest(formData);
      console.log(response);
    } catch (error) {
      console.log("An error has occured: ", error)
    }
  }


  const profileHandleSubmit = async (data) => {
    try {
      const response = await createProfile(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  const requestHandleUpdate = async (id, userRequestData) => {
    try {
      //superior method
      deleteRequest(userRequestData).then(() => {
        const response = createRequest(userRequestData)
        console.log(response)
      })
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
    <BunkmatesContext.Provider value={{ mapProfileCard, setMapProfileCard, center, setCenter }}>
      <BuildUserContext.Provider value={{ profileHandleSubmit, requestHandleSubmit, requestHandleUpdate, profileHandleRetrieval }}>
        {children}
      </BuildUserContext.Provider>
    </BunkmatesContext.Provider>
  )

}