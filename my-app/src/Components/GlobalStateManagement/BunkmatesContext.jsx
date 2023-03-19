import { createContext, useState } from "react";
import CreateRequestForm from "../CreateRequestForm";
import { createRequest } from "../../api";

export const BunkmatesContext = createContext(null)
export const CreateRequestContext = createContext(null)

export default function MapProvider({ children }) {

  //state management for what profile card is shown on the bunkmates page
  const [mapProfileCard, setMapProfileCard] = useState(null)

  const handleSubmit = async (formData) => {
    //record values in backend
    try {
      const response = await createRequest(formData);
      console.log(response);
    } catch (error) {
      console.log("An error has occured: ", error)
    }
  }
  return (
    <BunkmatesContext.Provider value={{ mapProfileCard, setMapProfileCard }}>
      <CreateRequestContext.Provider value={handleSubmit}>
        {children}
      </CreateRequestContext.Provider>
    </BunkmatesContext.Provider>
  )

}