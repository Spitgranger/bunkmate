import React, {useState, useContext, useEffect} from "react"
import "./SignIn.css"
import Modal from "../../Utils/modal.tsx";
import {LineBox, DropDownMenu, FormSingleLineInput, ActionButton} from '../../Utils/form.tsx';
import {Button} from "@mui/material";
import {FcGoogle} from 'react-icons/fc'
import {IoLogoFacebook} from 'react-icons/io'
import {BsApple} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {BsPhoneFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {signIn, signUp} from "../../api";
import ProfileMakerForm from "../profiles/ProfileMakerForm.tsx";
import {SignInContext} from "../../globalContext/SignInContext";
import Divider from "@mui/material/Divider";

interface SignInPartnerProps {
    company: string
    logo: React.ReactElement
    onClick?: () => void
}

/**
 *
 * @param company {string} The string that is the name of the sign in provider
 * @param logo {React.ReactElement} The logo (imported from MUI icons) that is ReactElement representing the company logo
 * @param onClick {() => void} The onClick event handler function that decides what to do when partner button clicked, optional for now as functionality not implemented
 * @description Component to render out the sign in partner button
 */
function SignInPartner({company, logo, onClick}: SignInPartnerProps) {

    return (
        <Button id="partnerButton" onClick={onClick}>
            {logo}
            <div>
                <div style={{whiteSpace: 'nowrap'}}>
                    Continue with {company}
                </div>
            </div>
        </Button>)

}

/**
 * @description Function to return the React Element that displays the correct modal window based on the values set in the SignInContext
 * @return {React.ReactElement}
 */
export default function RenderWhich() {
    //choose which pages to render within modal Window
    const {isOpen, setIsOpen, mode, message} = useContext(SignInContext)

    const displayInModalWindow = (mode: string) => {
        switch (mode) {
            /*Default is to sign in with email */
            case 'signInEmail':
                return <SignInEmail/>
            case 'signUpEmail':
                return <SignUpEmail/>
            case "signInPhone":
                return <SignInPhone/>
            case "profileMakerForm":
                return <ProfileMakerForm/>
            default:
                return <SignInEmail/>
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

/**
 * @description Function that handles login. Sets the user profile retrieved in local storage or returns an error string otherwise.
 * @param e {Event} The event, which is needed to prevent page refresh
 * @param data {Object} The object containing the data to be sent to the API endpoint signIn
 * @return Promise<"Success!" | "User doesn't exist" | "Invalid Credentials" | undefined>
 */
async function validateLogin(e: Event, data: object) {
    //validate login credentials
    e.preventDefault();
    try {
        const jsonResponse = await signIn(data);
        localStorage.setItem('profile', JSON.stringify(jsonResponse.data));
        return "Success!";
    } catch (error: any) {
        console.log(error.response.data.message)
        switch (error.response.data.message) {
            case "User doesn't exist":
                return "User doesn't exist";
            case "Invalid Credentials":
                return "Invalid Credentials";
            default:
                return;
        }
    }
}

/**
 *
 * @description Returns a React element that displays the Sign-in page in the case of email login
 * @return React.ReactElement
 */
export function SignInEmail() {

    const navigate = useNavigate();
    const {setMode, setMessage} = useContext(SignInContext)
    const [data, setData] = useState({email: '', password: ''});
    const [error, setError] = useState<string | undefined>("default");

    const handleFieldChange = (e: Event) => {
        //records data
        const target = e.target as HTMLTextAreaElement
        setData((prevData) => ({...prevData, [target?.name]: target?.value}))
    }
    const handleSignIn = async (e: Event) => {
        //Verify login details
        const response = await validateLogin(e, data);
        //5 lines below are pretty much garbage need to figure out how to extract error message
        setError(response);
    }

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
            }/>
            <div className="disclaimerContainer">
                <h6 id="disclaimer">
                    We will call or text you to confirm your number.
                    Standard message and data rates apply. Alternatively,
                    you can use one of our sign in partners below
                    <u style={{cursor: 'pointer'}}>Privacy Policy</u>
                </h6>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: "10px"}}>
                <div className="new-user" onClick={() => {
                    setMessage("Sign Up Now!");
                    setMode("signUpEmail")
                }}>
                    Don't have an account? Sign Up!
                </div>
            </div>
            <ActionButton width="100%" type="submit" title="Submit" onClick={(e: Event) => {
                void handleSignIn(e)
            }}/>
            <Divider sx={{fontSize: '12px'}}>
                or
            </Divider>
        </div>
        <div className="socials">
            <SignInPartner logo={<FcGoogle size="20px"/>} company="Google"/>
            <SignInPartner logo={<IoLogoFacebook size="20px" color="blue"/>} company="Facebook"/>
            <SignInPartner logo={<BsApple size="20px" color="black"/>} company="Apple"/>
            <SignInPartner logo={<BsPhoneFill size="20px"/>} company="Phone" onClick={() => {
                setMode('signInPhone');
                setMessage('Sign In or Sign Up')
            }}/>
        </div>
    </>)
}

/**
 *
 * @param e {Event} The event object that is required to prevent page refresh
 * @param data {object} The object containing the data that is to be passed to endpoint signUp
 */
async function handleSignUp(e: Event, data: object) {
    //Record user data after signing up
    e.preventDefault();
    const response = await signUp(data);
    //TODO delete this console.log when in production
    console.log(JSON.stringify(response));
}

/**
 * @description React functional component that returns the content to render out the email sign-up component
 * @return {React.ReactElement} That contains the sign-up modal window content
 */
export function SignUpEmail() {

    {/* Change default to the user's current location */
    }
    const [data, setData] = useState({phoneNumber: '', name: '', email: '', password: '', confirmPassword: ''});
    const {setMode, setMessage} = useContext(SignInContext)

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({...prevData, [e.target.name]: e.target.value}))
    }

    const handleRegularSignUpEmail = (e: Event, data: object) => {
        //Changes to sign in mode once sign up is complete
        void handleSignUp(e, data)
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
                        <u style={{cursor: 'pointer'}}>Privacy Policy</u>
                    </h6>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', fontSize: "10px"}}>
                    <div className="old-user" onClick={() => {
                        setMessage("Sign In With Email!");
                        setMode("signInWithEmail")
                    }}>
                        Already have an account? Sign In!
                    </div>
                </div>
                <ActionButton
                    width="100%"
                    disabled={false}
                    type="submit"
                    title="Submit"
                    onClick={(e) => handleRegularSignUpEmail(e, data)}/>
                <Divider sx={{fontSize: '12px'}}>
                    or
                </Divider>
            </div>
            <div className="socialsFlex">
                <SignInPartner logo={<FcGoogle size="20px"/>} company="Google"/>
                <SignInPartner logo={<IoLogoFacebook size="20px" color="blue"/>} company="Facebook"/>
                <SignInPartner logo={<BsApple size="20px" color="black"/>} company="Apple"/>
                <SignInPartner logo={<BsPhoneFill size="20px"/>} company="Phone" onClick={() => {
                    setMode("signInPhone");
                    setMessage("Sign In or Sign Up")
                }}/>
            </div>
        </>
    )
}


/**
 * @description React functional component that contains the logic and content required to display the phone sign-in page.
 * @return {React.ReactElement} That contains the content required to display the phone sign-in page
 */
export function SignInPhone() {

    const {setMode, setMessage} = useContext(SignInContext)

    {/* TODO Change default to the user's current location */
    }
    const [field, setField] = useState('United States (+1)')

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        required={true}
                        disabled={false}
                        onChange={handleFieldChange}
                        value={field}
                        label='Country Code'
                        menuItem={keys}
                    />,
                    <FormSingleLineInput
                        field="Phone Number"
                        required={true}
                        disabled={false}
                        placeHolder="6471234567"
                        onChange={handleFieldChange}
                        inputAdornment={true}
                        size="small"
                        type="number"
                    />]
                }/>
                <div className="disclaimerContainer">
                    <h6 id="disclaimer">
                        We will call or text you to confirm your number.
                        Standard message and data rates apply. Alternatively,
                        you can use one of our sign in partners below
                        <u style={{cursor: 'pointer'}}>Privacy Policy</u>
                    </h6>
                </div>
                <ActionButton
                    width="100%"
                    type="submit"
                    title="Submit"
                    disabled={false}
                    onClick={() => {
                        setMode("signUpEmail");
                        setMessage("Sign Up Now")
                    }}/>
                <Divider style={{fontSize: '12px'}}>
                    or
                </Divider>
            </div>
            <div className="socials">
                <SignInPartner logo={<FcGoogle size="20px"/>} company="Google" onClick={() => {
                    setMode("signUpForm");
                    setMessage("Sign Up Form")
                }}/>
                <SignInPartner logo={<IoLogoFacebook size="20px" color="blue"/>} company="Facebook"/>
                <SignInPartner logo={<BsApple size="20px" color="black"/>} company="Apple"/>
                <SignInPartner logo={<MdEmail size="20px"/>} company="Email" onClick={() => {
                    setMode("signInEmail");
                    setMessage("Sign In With Email")
                }}/>
            </div>
        </>
    )
}

