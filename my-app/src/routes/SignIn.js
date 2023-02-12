import { useState } from "react"
import "./SignIn.css"
import Modal from "../Components/Modal";
import { LineBox, DropDownMenu, FormSingleLineInput, ActionButton } from '../Components/SubComponents/Form';
import { Button } from "@mui/material";
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'
import { BsApple } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'


function SignInPartner({ company, logo, onClick }) {

  return (
    <div style={{ alignItems: 'center' }}>
      <Button onClick={onClick}>
        {logo}
        <div>
          Sign in with {company}
        </div>
      </Button>
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
  const [mode, setMode] = useState("default");

  const handleChange = (event) => {
    setField(event.target.value);
  }
  const renderWhich = (mode) => {
    switch (mode) {
      case 'default':
        return <>
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
                <ActionButton width="100%" type="submit" title="Submit" onClick={() => setMode("signInEmail")} />
              </div>
              <div className="socials" >
                <SignInPartner logo={<FcGoogle />} company="Google" />
                <SignInPartner logo={<IoLogoFacebook color="blue" />} company="Facebook" />
                <SignInPartner logo={<BsApple />} company="Apple" />
                <SignInPartner logo={<MdEmail />} company="Email" onClick={() => { setMode("signUpEmail"); console.log(mode) }} />
              </div>
            </div>
          }>
          </Modal>
          <button style={{ display: 'none' }} onClick={() => setIsOpen(true)}></button>
        </>
      case 'signUpEmail':
        return <SignUpEmail />
      case "signInEmail":
        return <SignInEmail />
    }
  }

  return (
    <>
      <div className='buttonWrapperStyles' >
        {openModalName}
        {renderWhich(mode)}
      </div>

    </>
  )
}

export default SignIn;

function SignUpEmail() {
  const [isOpen, setIsOpen] = useState(false);
  {/* Change default to the user's current location */ }
  const [data, setData] = useState({ phoneNumber: '', email: '', password: '', confirmPassword: '' });
  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <Modal open={isOpen} modalMessage="Sign up With Email" onClose={() => setIsOpen(false)} content={
        <div className="content">
          <LineBox flex={false} CssTextField={[
            <FormSingleLineInput
              name="email"
              field="Email"
              placeHolder="example@example.com"
              size="small"
              type="email"
              value={data.email}
              onChange={handleChange}
            />,
            <FormSingleLineInput
              name="phoneNumber"
              field="Phone Number"
              placeHolder="6471234567"
              size="small"
              type="number"
              value={data.phone}
              onChange={handleChange}
            />,
            <FormSingleLineInput
              name="password"
              field="Password"
              size="small"
              type="password"
              value={data.password}
              onChange={handleChange}
            />,
            <FormSingleLineInput
              name="confirmPassword"
              field="Confirm Password"
              size="small"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          ]
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
            <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => { handleSubmit(e, data) }} />
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
    </>
  )
}

function SignInEmail() {
  const [isOpen, setIsOpen] = useState(false);
  {/* Change default to the user's current location */ }
  const [data, setData] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <Modal open={isOpen} modalMessage="Sign In With Email" onClose={() => setIsOpen(false)} content={
        <div className="content">
          <LineBox flex={false} CssTextField={[
            <FormSingleLineInput
              name="email"
              field="Email"
              placeHolder="example@example.com"
              size="small"
              type="email"
              value={data.email}
              onChange={handleChange}
            />,
            <FormSingleLineInput
              name="password"
              field="Password"
              size="small"
              type="password"
              value={data.password}
              onChange={handleChange}
            />
          ]
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
            <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => { handleSignIn(e, data) }} />
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
    </>
  )
}

function handleSubmit(e, data) {
  console.log(data);
  e.preventDefault();
  fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
}

function handleSignIn(e, data) {
  console.log(data);
  e.preventDefault();
  fetch('/api/users/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
    .then(response => localStorage.setItem('profile', JSON.stringify({ response })))
}