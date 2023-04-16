import { createContext, useState } from "react";
import { createRequest, createProfile, deleteRequest, getProfiles, deleteProfile } from "../../api";

export const UserDataContext = createContext(null)

export default function UserDataProvider({ children }) {


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
    <UserDataContext.Provider value={{ profileHandleSubmit, profileHandleUpdate, requestHandleSubmit, requestHandleUpdate, profileHandleRetrieval }}>
      {children}
    </UserDataContext.Provider>
  )

}