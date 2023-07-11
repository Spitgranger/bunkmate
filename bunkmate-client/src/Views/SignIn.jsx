import { useState, useContext, useEffect, useRef } from "react"
import "./SignIn.css"
import Modal from "../Components/Utils/Modal.jsx";
import { LineBox, DropDownMenu, FormSingleLineInput, ActionButton } from '../Components/Utils/Form.jsx';
import { Button } from "@mui/material";
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'
import { BsApple } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BsPhoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api";
import ProfileMakerForm from "../Components/ProfileMakerForm";
import { getProfile } from '../api'
import { SignInContext } from "../Components/GlobalStateManagement/SignInContext";
import Divider from "@mui/material/Divider";
import useSocket from "./useSocket.tsx";


function SignInPartner({ company, logo, onClick }) {

  return (
    <Button id="partnerButton" onClick={onClick}>
      {logo}
      <div>
        <div style={{ whiteSpace: 'nowrap' }}>
          Continue with {company}
        </div>
      </div>
    </Button>)

}

export default function RenderWhich() {
  //choose which pages to render within modal Window
  const { isOpen, setIsOpen, mode, message } = useContext(SignInContext)

  const displayInModalWindow = (mode) => {
    switch (mode) {
      /*Default is to sign in with email */
      case 'signInEmail':
        return <SignInEmail />
      case 'signUpEmail':
        return <SignUpEmail />
      case "signInPhone":
        return <SignInPhone />
      case "profileMakerForm":
        return <ProfileMakerForm />
      default:
        return <SignInEmail />
    }
  }

  return (
    <Modal open={isOpen} modalMessage={message} onClose={() => setIsOpen(false)} content={
      <div className='buttonWrapperStyles'>
        {displayInModalWindow(mode)}
      </div>}>
    </Modal>
  )
}

async function validateLogin(e, data) {
  //validate login credentials
  e.preventDefault();
  try {
    const jsonResponse = await signIn(data);
    localStorage.setItem('profile', JSON.stringify(jsonResponse.data));
    return "Success!";
  } catch (error) {
    console.log(error?.response?.data?.message)
    switch (error?.response?.data?.message) {
      case "User doesn't exist":
        return "User doesn't exist";
      case "Invalid Credentials":
        return "Invalid Credentials";
      default:
        return;
    }
  }
}
export function SignInEmail() {


  const navigate = useNavigate();
  const { setMode, setIsOpen, setMessage } = useContext(SignInContext)
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState("default");


  const handleFieldChange = (e) => {
    //records data
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }
  const handleSignIn = async e => {
    //Verify login details 
    const response = await validateLogin(e, data);
    //5 lines below are pretty much garbage need to figure out how to extract error message
    setError(response);
  }


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


  //if no errors and user doesn't already have a profile then display profilemaker
  useEffect(() => {
    if (error === "Success!") {
      navigate(0)
    } else {
      return
    }
  }, [error]);



  return (<>
    <div className="content">
      {error != "default" ? <h4>{error}</h4> : null}
      <LineBox flex={false} CssTextField={[
        <FormSingleLineInput
          name="email"
          field="Email"
          placeHolder="example@example.com"
          size="small"
          value={data.email}
          onChange={handleFieldChange}
        />,
        <FormSingleLineInput
          name="password"
          field="Password"
          size="small"
          type="password"
          value={data.password}
          onChange={handleFieldChange}
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
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: "10px" }} >
        <div className="new-user" onClick={() => { setMessage("Sign Up Now!"); setMode("signUpEmail") }}>
          Don't have an account? Sign Up!
        </div>
      </div>
      <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => { handleSignIn(e) }} />
      <Divider sx={{ fontSize: '12px' }}>
        or
      </Divider>
    </div>
    <div className="socials" >
      <SignInPartner logo={<FcGoogle size="20px" />} company="Google" />
      <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
      <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
      <SignInPartner logo={<BsPhoneFill size="20px" />} company="Phone" onClick={() => { setMode('signInPhone'); setMessage('Sign In or Sign Up') }} />
    </div>
  </>)
}


async function handleSignUp(e, data) {
  //Record user data after signing up
  e.preventDefault();
  const response = await signUp(data);
  console.log(JSON.stringify(response));
}


export function SignUpEmail() {


  {/* Change default to the user's current location */ }
  const [data, setData] = useState({ phoneNumber: '', name: '', email: '', password: '', confirmPassword: '' });
  const { setMode, setMessage, setIsOpen } = useContext(SignInContext)

  const handleFieldChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }

  const handleRegularSignUpEmail = (e, data) => {
    //Changes to sign in mode once sign up is complete
    handleSignUp(e, data)
    setMessage("Sign In With Email")
    setMode("signInEmail")
  }

  return (
    <>
      <div className="content">
        <LineBox flex={true} CssTextField={[
          <FormSingleLineInput
            name="name"
            field="First Name"
            size="small"
            type="name"
            value={data.name}
            onChange={handleFieldChange}
          />,
          <FormSingleLineInput
            name="phoneNumber"
            field="Phone Number"
            placeHolder="6473547123"
            size="small"
            value={data.phoneNumber}
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
          />,
          <FormSingleLineInput
            name="confirmPassword"
            field="Confirm Password"
            size="small"
            type="password"
            value={data.confirmPassword}
            onChange={handleFieldChange}
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
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: "10px" }} >
          <div className="old-user" onClick={() => { setMessage("Sign In With Email!"); setMode("signInWithEmail") }}>
            Already have an account? Sign In!
          </div>
        </div>
        <ActionButton width="100%" type="submit" title="Submit" onClick={(e) => handleRegularSignUpEmail(e, data)} />
        <Divider sx={{ fontSize: '12px' }} >
          or
        </Divider>
      </div>
      <div className="socialsFlex" >
        <SignInPartner logo={<FcGoogle size="20px" />} company="Google" />
        <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
        <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
        <SignInPartner logo={<BsPhoneFill size="20px" />} company="Phone" onClick={() => { setMode("signInPhone"); setMessage("Sign In or Sign Up") }} />
      </div>
    </>
  )
}

export function SignInPhone() {

  const seperatorStyles = {
    display: 'flex',
    left: '190px',
    bottom: '308px',
    position: 'absolute',
    fontSize: '10px',
    backgroundColor: 'white',
    width: '30px',
    justifyContent: 'center'
  }
  const { setMode, setMessage } = useContext(SignInContext)


  {/* Change default to the user's current location */ }
  const [field, setField] = useState('United States (+1)')

  const handleFieldChange = (event) => {
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
            onChange={handleFieldChange}
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
        <ActionButton width="100%" type="submit" title="Submit" onClick={() => { setMode("signUpEmail"); setMessage("Sign Up Now") }} />
        <Divider style={{ fontSize: '12px' }}>
          or
        </Divider>
      </div>
      <div className="socials" >
        <SignInPartner logo={<FcGoogle size="20px" />} company="Google" onClick={() => { setMode("signUpForm"); setMessage("Sign Up Form") }} />
        <SignInPartner logo={<IoLogoFacebook size="20px" color="blue" />} company="Facebook" />
        <SignInPartner logo={<BsApple size="20px" color="black" />} company="Apple" />
        <SignInPartner logo={<MdEmail size="20px" />} company="Email" onClick={() => { setMode("signInEmail"); setMessage("Sign In With Email") }} />
      </div>
    </>
  )
}

