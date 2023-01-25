import LoginModal from "../Components/LoginModal";
import { useState } from "react"
import "./SignIn.css"
import Navbar from "../Components/Navbar"

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function SignIn() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <Navbar/>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <LoginModal open={isOpen} onClose={() => setIsOpen(false)}>
          Modal Window
        </LoginModal>
      </div>

    </>
  )
}

export default SignIn;

