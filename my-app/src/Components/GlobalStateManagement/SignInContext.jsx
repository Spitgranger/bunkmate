import { useState, createContext, useEffect } from 'react';

export const SignInContext = createContext(null)

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
    <SignInContext.Provider value={{ 
      isOpen, setIsOpen, 
      mode, setMode,
      message, setMessage, 
      userProfile, 
      setUserProfile 
    }}>
      {children}
    </SignInContext.Provider>
  )

}