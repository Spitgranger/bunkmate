import { useState, createContext, useEffect } from 'react';

export const SignInOpenContext = createContext(null)
export const SignInModeContext = createContext(null)
export const SignInModalMessageContext = createContext(null)
export const SignInDataContext = createContext(null)

export default function SignInProvider({ children }) {

  //manages the open and closed state of modal window
  const [isOpen, setIsOpen] = useState(false)
  //manages the sign in and signup state
  const [mode, setMode] = useState("signInEmail")
  //manages the modal message ie: "Sign in with email"
  const [message, setMessage] = useState("Sign In or Sign Up")
  //Used to handle retrieving user data from api
  const [userProfile, setUserProfile] = useState("")






  return (
    <SignInOpenContext.Provider value={{ isOpen, setIsOpen }}>
      <SignInModeContext.Provider value={{ mode, setMode }}>
        <SignInModalMessageContext.Provider value={{ message, setMessage }}>
          <SignInDataContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
          </SignInDataContext.Provider>
        </SignInModalMessageContext.Provider>
      </SignInModeContext.Provider>
    </SignInOpenContext.Provider>
  )

}