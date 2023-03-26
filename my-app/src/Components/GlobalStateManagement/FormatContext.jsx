import { createContext } from "react";

export const formatContext = createContext(null)

export default function FormatProvider({ children }) {

  const capitalizedName = (name) => {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}`
  };


  const calculateAge = (profile) => {
    console.log(profile)
    const birthdate = profile.birthday
    const currentDate = new Date().toISOString().slice(0, 10);
    const age = Math.floor((new Date(currentDate) - new Date(birthdate)) / 31557600000) //31557600000 is the number of milliseconds in a year
    return age
  }

  return (
    <formatContext.Provider value={{ capitalizedName, calculateAge }}>
      {children}
    </formatContext.Provider>
  )

}