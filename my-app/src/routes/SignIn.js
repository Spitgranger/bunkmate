import { useState } from "react"
import "./SignIn.css"
import Modal from "../Components/Modal";


function SignIn({ openModalMessage, content }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='buttonWrapperStyles' >
        {openModalMessage}
        <Modal open={isOpen} modalMessage="Sign in or Sign up" onClose={() => setIsOpen(false)} content={content}>
        </Modal>
        <button style={{ display: 'none' }} onClick={() => setIsOpen(true)}></button>
      </div>

    </>
  )
}

export default SignIn;

