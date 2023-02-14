import { useState, createContext } from 'react';


export const SignInOpenContext = createContext(null)
export const SignInModeContext = createContext(null)
export const SignInModalMessage = createContext(null)

export default function SignInProvider({ children }) {

  //manages the open and closed state of modal window
  const [isOpen, setIsOpen] = useState(false)
  //manages the sign in and signup state
  const [mode, setMode] = useState("signInEmail")
  //manages the modal message ie: "Sign in with email"
  const [message, setMessage] = useState("Sign In or Sign Up")

  return (
    <SignInOpenContext.Provider value={{ isOpen, setIsOpen }}>
      <SignInModeContext.Provider value={{ mode, setMode }}>
        <SignInModalMessage.Provider value={{ message, setMessage}}>
          {children}
        </SignInModalMessage.Provider>
      </SignInModeContext.Provider>
    </SignInOpenContext.Provider>
  )

}