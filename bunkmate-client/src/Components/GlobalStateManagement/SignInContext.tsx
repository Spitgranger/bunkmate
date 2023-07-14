import {JSX, useState, createContext, ReactNode} from 'react';
import React from 'react'


type SetState<T> = React.Dispatch<React.SetStateAction<T>>

interface SignInContextProps {
    isOpen: boolean
    setIsOpen: SetState<boolean>
    mode: string
    setMode: SetState<string>
    message: string
    setMessage: SetState<string>
    userProfile: string
    setUserProfile: SetState<string>
    handleSignInEmail: () => void
    handleSignUpEmail: () => void
    handlePhone: () => void
    handleProfile: () => void
}

const DefaultSignInContextProps = {
    isOpen: false, setIsOpen: () => undefined,
    mode: "signInEmail", setMode: () => undefined,
    message: "Sign In or Sign Up", setMessage: () => undefined,
    userProfile: "", setUserProfile: () => undefined,
    handleSignInEmail: () => undefined,
    handleSignUpEmail: () => undefined,
    handlePhone: () => undefined,
    handleProfile: () => undefined
}


export const SignInContext = createContext<SignInContextProps>(DefaultSignInContextProps)

export default function SignInProvider({children}: { children: ReactNode }): JSX.Element {


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
                userProfile, setUserProfile,
                handleSignInEmail,
                handleSignUpEmail,
                handlePhone,
                handleProfile
            }}>

            {children}
        </SignInContext.Provider>
    )

}