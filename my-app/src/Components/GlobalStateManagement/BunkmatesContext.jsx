import { createContext, useState } from "react";

export const BunkmatesContext = createContext(null)

export default function MapProvider({ children }) {

  //state management for what profile card is shown on the bunkmates page
  const [mapProfileCard, setMapProfileCard] = useState(null)

  return (
    <BunkmatesContext.Provider value={{ mapProfileCard, setMapProfileCard }}>
      {children}
    </BunkmatesContext.Provider>
  )

}