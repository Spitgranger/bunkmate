import { useState } from "react"
import "./SignIn.css"
import Modal from "../Components/Modal";
import { LineBox, DropDownMenu, FormSingleLineInput, ActionButton } from '../Components/SubComponents/Form';
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
    </div>);

}

const MenuItem = {
  "Canada (+1)": 1,
  "United States (+1)": 1,
  "United Kingdom (+44)": 44,
}

const keys = Object.keys(MenuItem)

function SignIn({ openModalName }) {
  const [isOpen, setIsOpen] = useState(false)
  {/* Change default to the user's current location */ }
  const [field, setField] = useState('United States (+1)')

  const handleChange = (event) => {
    setField(event.target.value);
  }

  return (
    <>
      <div className='buttonWrapperStyles' >
        {openModalName}
        <Modal open={isOpen} modalMessage="Sign in or Sign up" onClose={() => setIsOpen(false)} content={
          <div className="content">
            <LineBox flex={false} CssTextField={[
              <DropDownMenu
                onChange={handleChange}
                value={field}
                label='Country Code'
                menuItem={keys}
              />,
              <FormSingleLineInput
                field="Phone Number"
                placeHolder="6471234567"
                inputAdornment={true}
                size="small"
                type="number"
                inputAdornmentText={`+${MenuItem[field]}`}
              />]
            } />
            <div className="disclaimerContainer">
              <h6 id="disclaimer">
                We will call or text you to confirm your number.
                Standard message and data rates apply. Alternatively,
                you can use one of our sign in partners below
                <u style={{ cursor: 'pointer' }}>Privacy Policy</u>
              </h6>
            </div>
            <div className="button" style={{ borderBottom: "1px solid lightgrey" }}>
              <ActionButton width="100%" type="submit" title="Submit" />
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

