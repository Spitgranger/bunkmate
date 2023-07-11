import {JSX, useState, createContext} from 'react';

export const SignInContext = createContext(null)

export default function SignInProvider({children}): JSX.Element {


    //manages the open and closed state of modal window
    const [isOpen, setIsOpen] = useState(false)
    //manages the sign in and signup state
    const [mode, setMode] = useState("signInEmail")
    //manages the modal message ie: "Sign in with email"
    const [message, setMessage] = useState("Sign In or Sign Up")
    //Used to handle retrieving user data from api
    const [userProfile, setUserProfile] = useState("")

    const handleSignInEmail = () => {
        setMessage("Sign In With Email")
        setMode('signInEmail')
        setIsOpen(true)
    }

    const handleSignUpEmail = () => {
        setMessage("Sign Up Now!")
        setMode('signUpEmail')
        setIsOpen(true)
    }

    const handlePhone = () => {
        setMessage("Sign in or Sign up")
        setMode('signInPhone')
        setIsOpen(true)
    }

    const handleProfile = () => {
        setMessage("")
        setMode('profileMakerForm')
        setIsOpen(true)
    }

    return (
        <SignInContext.Provider
            value={{
                isOpen, setIsOpen,
                mode, setMode,
                message, setMessage,
                userProfile,
                setUserProfile,
                handleSignInEmail,
                handleSignUpEmail,
                handlePhone,
                handleProfile
            }}>

            {children}
        </SignInContext.Provider>
    )

}