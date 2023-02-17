import { useState, useContext } from "react"
import "./SignIn.css"
import Modal from "../Components/SubComponents/Modal";
import { LineBox, DropDownMenu, FormSingleLineInput, ActionButton } from '../Components/SubComponents/Form';
import { Button } from "@mui/material";
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'
import { BsApple } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BsPhoneFill } from "react-icons/bs";
import { SignInOpenContext } from "../Components/GlobalStateManagement/SignInContext";
import { SignInModeContext } from "../Components/GlobalStateManagement/SignInContext";
import { SignInModalMessage } from "../Components/GlobalStateManagement/SignInContext";
import { useNavigate } from "react-router-dom";


function SignInPartner({ company, logo, onClick }) {

  return (
    <Button id="partnerButton" onClick={onClick}>
      <div style={{ alignItems: 'center' }}>
        {logo}
        <div>
          Continue with {company}
        </div>
      </div>
    </Button>)

}

export default function RenderWhich() {
  //choose which pages to render within modal Window
  const { isOpen, setIsOpen } = useContext(SignInOpenContext)
  const { mode } = useContext(SignInModeContext)
  const { message } = useContext(SignInModalMessage)

  const displayInModalWindow = (mode) => {
    switch (mode) {
      /*Default is to sign in with email */
      case 'signInEmail':
        return <SignInEmail />
      case 'signUpEmail':
        return <SignUpEmail />
      case "signInPhone":
        return <SignInPhone />
      default:
        return <SignInEmail />
    }
  }
  console.log(mode)
  return (
    <Modal open={isOpen} modalMessage={message} onClose={() => setIsOpen(false)} content={
      <div className='buttonWrapperStyles'>
        {displayInModalWindow(mode)}
      </div>}>
    </Modal>
  )
}


export function SignInEmail() {
  const navigate = useNavigate();
  const { setMode } = useContext(SignInModeContext)
  const { setIsOpen } = useContext(SignInOpenContext)
  const { setMessage } = useContext(SignInModalMessage)
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  const handleResponse = async e => {
    handleSignIn(e, data);
    console.log(data);
    //5 lines below are pretty much garbage need to figure out how to extract error message
    setIsOpen(false);
    navigate(0)
  }

  return (<>
    <div className="content">
      {error ? <span>{error}</span> : null}
      <span>{error}</span>
      <LineBox flex={false} CssTextField={[
        <FormSingleLineInput
          name="email"
          field="Email"
          placeHolder="example@example.com"
          size="small"
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
        <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => { handleResponse(e) }} />
      </div>
      <div className="socials" >
        <SignInPartner logo={<FcGoogle size="20px" />} company="Google" />
        <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
        <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
        <SignInPartner logo={<BsPhoneFill size="20px" />} company="Phone" onClick={() => { setMode('signInPhone'); setMessage('Sign In or Sign Up') }} />
      </div>
    </div>
  </>)
}

export function SignUpEmail() {
  {/* Change default to the user's current location */ }
  const [data, setData] = useState({ phoneNumber: '', name: '', email: '', password: '', confirmPassword: '' });
  const { setMode } = useContext(SignInModeContext)
  const { setMessage } = useContext(SignInModalMessage)
  const { setIsOpen } = useContext(SignInOpenContext)
  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  return (
    <>
      <div className="content">
        <LineBox flex={true} CssTextField={[
          <FormSingleLineInput
            name="phoneNumber"
            field="Phone Number"
            placeHolder="6471234567"
            size="small"
            value={data.phone}
            onChange={handleChange}
          />,
          <FormSingleLineInput
            name="name"
            field="Full Name"
            placeHolder="Samuel Thompson"
            size="small"
            value={data.name}
            onChange={handleChange}
          />,
        ]
        }
        />
        <LineBox flex={true} CssTextField={[
          <FormSingleLineInput
            name="email"
            field="Email"
            placeHolder="example@example.com"
            size="small"
            value={data.email}
            onChange={handleChange}
          />,
        ]
        }
        />
        <LineBox flex={true} CssTextField={[
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
        }
        />
        <div className="disclaimerContainer">
          <h6 id="disclaimer">
            We'll Send you a confirmation email. Please check
            your inbox. Alternatively, you can use one of our
            sign in partners below
            <u style={{ cursor: 'pointer' }}>Privacy Policy</u>
          </h6>
        </div>
        <div className="button" style={{ borderBottom: "1px solid lightgrey" }}>
          <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => { handleSubmit(e, data); setIsOpen(false) }} />
        </div>
        <div className="socialsFlex" >
          <SignInPartner logo={<FcGoogle size="20px" />} company="Google" />
          <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
          <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
          <SignInPartner logo={<BsPhoneFill size="20px" />} company="Phone" onClick={() => { setMode("signInPhone"); setMessage("Sign In or Sign Up") }} />
        </div>
      </div>
    </>
  )
}

export function SignInPhone() {

  const { setMode } = useContext(SignInModeContext)
  const { setMessage } = useContext(SignInModalMessage)


  {/* Change default to the user's current location */ }
  const [field, setField] = useState('United States (+1)')

  const handleChange = (event) => {
    setField(event.target.value);
  }


  const MenuItem = {
    "Canada (+1)": 1,
    "United States (+1)": 1,
    "United Kingdom (+44)": 44,
  }

  const keys = Object.keys(MenuItem)

  return (
    <>
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
          <ActionButton width="100%" type="submit" title="Submit" onClick={() => { setMode("signInEmail"); setMessage("Sign In With Email") }} />
        </div>
        <div className="socials" >
          <SignInPartner logo={<FcGoogle size="20px" />} company="Google" />
          <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
          <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
          <SignInPartner logo={<MdEmail size="20px" />} company="Email" onClick={() => { setMode("signInEmail"); setMessage("Sign In With Email") }} />
        </div>
      </div>
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
    .then(response => { if (response.message !== "User doesn't exist") { localStorage.setItem('profile', JSON.stringify({ response })); return ""; } else { }; })

}