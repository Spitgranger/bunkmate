import { useState } from "react"
import "./SignIn.css"
import Modal from "../Components/Modal";
import { FormSingleLineInput, ActionButton } from '../Components/SubComponents/Form';
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'
import { BsApple } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

function SignInPartner({ company, logo }) {

  return (
    <div style={{ alignItems: 'center' }}>
      {logo}
      <div>
        Sign in with {company}
      </div>
    </div>)

}

function SignIn({ openModalName }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='buttonWrapperStyles' >
        {openModalName}
        <Modal open={isOpen} modalMessage="Sign in or Sign up" onClose={() => setIsOpen(false)} content={
          <div className="content">
            <FormSingleLineInput
              field1="Region"
              field2="Phone Number"
              placeHolder1="Canada"
              placeHolder2="ex. +1 (XXX) XXX XXXX" />
            <div className="disclaimerContainer">
              <h6 id="disclaimer">
                We will call or text you to confirm your number.
                Standard message and data rates apply. Alternatively,
                you can use one of our sign in partners below
                <u style={{ cursor: 'pointer' }}>Privacy Policy</u>
              </h6>
            </div>
            <div className="button" style={{ borderBottom: "1px solid lightgrey" }}>
              <ActionButton title="Submit" />
            </div>
            <div className="socials" >
              <SignInPartner logo={<FcGoogle />} company="Google" />
              <SignInPartner logo={<IoLogoFacebook color="blue" />} company="Facebook" />
              <SignInPartner logo={<BsApple />} company="Apple" />
              <SignInPartner logo={<MdEmail />} company="Email" />
            </div>
          </div>
        }>
        </Modal>
        <button style={{ display: 'none' }} onClick={() => setIsOpen(true)}></button>
      </div>

    </>
  )
}

export default SignIn;

