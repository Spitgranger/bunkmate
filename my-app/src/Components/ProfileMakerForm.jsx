import { useState, useRef, useEffect, useContext, useMemo, useCallback, useReducer } from 'react'
import {
  DatePicker,
  FormSection,
  ActionButton,
  UploadFile,
  DropDownMenu,
  FormSingleLineInput,
  FormSingleLineAddressInput,
  FormMultiLineInput,
  LineBox,
} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import { IoChevronBack } from 'react-icons/io5';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {

  LinkValidationContext,
  ValuesObjectContext,
  ImageValidationContext,
  BirthdayValidationContext,
  GlobalValidationContext,
  PhoneValidationContext,
  AboutValidationContext,
  EmailValidationContext,

} from './GlobalStateManagement/ValidationContext';

import { createProfile } from '../api';
import { SignInContext } from './GlobalStateManagement/SignInContext'



//styles
const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}



//everything below will be displayed within a modal window, this page is shown after signing up for an account

const handleSubmit = async (data) => {
  try {
    const response = await createProfile(data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}

function ProfileMakerForm({ forwardButton, backwardButton }) {

  const { values, setValues } = useContext(ValuesObjectContext)
  const { phoneError, phoneHelperText } = useContext(PhoneValidationContext)
  const { emailError, emailHelperText } = useContext(EmailValidationContext)
  const { aboutError, aboutHelperText, handleAboutValidation } = useContext(AboutValidationContext)
  const { isOpen, setIsOpen } = useContext(SignInContext)

  const actions = {
    checkGlobalError: "check_global_error",
    checkLocalError: "check_local_error", //TODO
    checkValues: "check_values",
    checkDate: "check_dates",
  }
  const initialState = {
    values: values,
    globalError: true,
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state?.values)



  function reducer(state, action) {
    switch (action.type) {

      case actions.checkGlobalError: {
        if (Object.values(state.values).some(val => val === "")) {
          return { ...state, globalError: true }
        } else if (Object.values(state.values).every(val => val !== "")) {
          return { ...state, globalError: false };
        }
        break;
      }

      case actions.checkDate: {
        try {
          action.payload.toISOString();
          return { ...state, values: { ...state.values, birthday: action.payload.toISOString().split('T')[0] } }
        } catch (error) {
          return { ...state, values: { ...state.values, birthday: "" } }
        }
      }
      case actions.checkValues: {
        return { ...state, values: { ...state.values, [action.name]: action.payload } };
      }
    }
    throw Error('unknown action: ' + action.type)
  }

  //handle event function to record values of most fields
  const handleEmptyStringValidation = (e, name, date = false) => {
    if (date === true) {
      return dispatch({ type: actions.checkDate, payload: e })
    }
    dispatch({ type: actions.checkValues, payload: e.target.value, name: name })
    dispatch({ type: actions.checkGlobalError })
    //a special case just for date fields
  }

  //special handle event function just to file uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleConversion(file, (result) => {
      dispatch({ type: actions.checkValues, payload: result, name: "picture" });

    });
  }

  //converts image to base64-encoded string
  const handleConversion = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
    };
  }

  /* calling reducer function again gets the next state
  reducer(state, { type: actions.checkValues })
  reducer(state, { type: actions.checkGlobalError})
  */

  useEffect(() => {
    dispatch({ type: actions.checkGlobalError });
    dispatch({ type: actions.checkValues });

  }, [, state.globalError, state.values.birthday, state.values.picture, state.values.address])

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "formatted_address"],
    types: []
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      //loop through address components, takig each and checking their type
      const addressComponents = place.address_components
      addressComponents.forEach((component) => {
        //each case, setting the form values accordingly.
        switch (component.types[0]) {
          case "locality":
            // setValues(prevValue => ({ ...prevValue, city: component.long_name }))
            dispatch({ type: actions.checkValues, payload: component.long_name, name: "city" });
            break;
          case "administrative_area_level_1":
            //setValues(prevValue => ({ ...prevValue, province: component.long_name }))
            dispatch({ type: actions.checkValues, payload: component.long_name, name: "province" });
            break;
          case "country":
            //setValues(prevValue => ({ ...prevValue, country: component.long_name }))
            dispatch({ type: actions.checkValues, payload: component.long_name, name: "country" });
            break;
          default:
            break;
        }
      })
      //setValues({ ...values, city: place.address_components[3].long_name, country: place.address_components[6].long_name, province: place.address_components[5].long_name })
      dispatch({ type: actions.checkValues, payload: place.formatted_address, name: "address" });
    });
  }, []);

  //handle going back to the previous page
  const BackButton = () => {
    return (
      <label style={{ cursor: 'pointer' }}>
        <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
        <h3 style={backButtonStyles}>
          <IoChevronBack />Back
        </h3>
      </label>)
  }

  //handle closing the modal window
  const handleClose = () => {
    setIsOpen(false)
  }


  return (<>
    <FormSection title="Profile"
      message="*Everything in this section will be visible to other people. Don't worry you can always change it later"
    />
    <div style={{ display: 'flex', justifyContent: 'center', borderRadius: "90px" }}>
      {state?.values?.picture ? <img src={state?.values?.picture} style={{ width: "100px", height: "100px", borderRadius: "50px" }}></img> : null}
    </div>
    <UploadFile helperText="Supported Files: jpg, png" helperTextPos="45%" width="50%" type="file" message="Upload Profile Picture" accept={["image/jpg", "image/jpeg", "image/png"]} endIcon={<CameraAltIcon sx={{ color: "aqua" }} />} handleFileUpload={handleFileUpload} />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput required="true" size='small' type="text" field="Legal First Name" placeHolder="Sam" onChange={(e) => { handleEmptyStringValidation(e, 'firstName') }} value={state?.values?.firstName} />,
      <FormSingleLineInput required="true" size="small" type="text" field="Legal Last Name" placeHolder="Jenkins" onChange={(e) => { handleEmptyStringValidation(e, 'lastName') }} value={state?.values?.lastName} />,
      <DropDownMenu required="true" label="Gender" menuItem={["Male", "Female", "Other"]} value={state?.values?.gender} onChange={(e) => { handleEmptyStringValidation(e, 'gender') }} />,
    ]
    } />
    <div id="multiline">
      <FormMultiLineInput required="true" placeHolder="Tell us a bit about yourself" type="text" field="About Me" helperText={aboutHelperText} onChange={(e) => { handleAboutValidation(e); handleEmptyStringValidation(e, 'about') }} error={aboutError} value={state?.values?.about} />
    </div>

    {/*
    <ActionButton disabled={state.globalError} fontSize="15px" width="100%" onClick={() => { handleSubmit(values); localStorage.setItem("page1", JSON.stringify(values)); }} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
    <BackButton />
  */}
    <br />

    <FormSection title="Personal Info" message="*We mainly collect this data for our background checks." />
    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput required="true" size="small" type="text" field="Email" placeHolder="ex. bunkmates@gmail.com" error={emailError} helperText={emailHelperText} value={state?.values?.email} onChange={(e) => { handleEmptyStringValidation(e, 'email'); }} />,
      <DatePicker required="true" label="Birthday" value={state?.values?.birthday} onChange={(e) => handleEmptyStringValidation(e, 'birthday', true)} />
    ]
    } />


    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput required="true" size="small" helperText={phoneHelperText} field="Phone Number" placeHolder="6472345124" error={phoneError} onChange={(e) => { handleEmptyStringValidation(e, 'phone'); }} value={state?.values?.phone} />,
      <FormSingleLineAddressInput required="true" type="text" field="Address" placeHolder="31 West Street" inputRef={inputRef} value={state?.values?.address} onChange={(e) => { handleEmptyStringValidation(e, 'address'); }} />
    ]
    } />
    {state?.values.city && state?.values.country && state?.values.province ?
      <LineBox flex={true} CssTextField={[
        <FormSingleLineInput required="true" disabled={true} size="small" type="text" field="City" placeHolder="New York" value={state?.values?.city} />,
        <FormSingleLineInput required="true" disabled={true} size="small" type="text" field="Country" placeHolder="United States" value={state?.values?.country} />,
        <FormSingleLineInput required="true" disabled={true} size="small" type="text" field="Province/State" placeHolder="Ontario" value={state?.values?.province} />
      ]
      } /> : null}
    <LineBox flex={true} CssTextField={[
      <DropDownMenu required="true" label="Employment Status" menuItem={["Currently Employed", "Currently Unemployed", "Currently Self Employed"]} value={state?.values?.employment} onChange={(e) => { handleEmptyStringValidation(e, "employment"); }} />,
      <DropDownMenu required="true" label="Current Education" menuItem={["Not in School", "High School", "Undergraduate Studies", "Graduate Studies"]} value={state?.values?.education} onChange={(e) => { handleEmptyStringValidation(e, 'education'); }} />,
    ]} />

    <br />
    {/*
    <ActionButton disabled={state.globalError} fontSize="15px" width="100%" onClick={() => { handleSubmit(values); localStorage.setItem("page1", JSON.stringify(values)); }} type="submit" title="Continue" endIcon={<IoChevronForward color="aqua" />} />
    <BackButton />
    */}

    <FormSection title="Habits and LifeStyle" message="*Some of the information here will be used to match you with roomates and some of it will be used to build your profile" />
    <LineBox flex={true} CssTextField={[
      <DropDownMenu required="true" value={state?.values?.havePets} onChange={(e) => handleEmptyStringValidation(e, 'havePets')} label="Do you have pets" menuItem={["Yes", "No"]} />,
      <DropDownMenu required="true" value={state?.values?.sleepSchedule} onChange={(e) => handleEmptyStringValidation(e, 'sleepSchedule')} label="Sleep Schedule" menuItem={["Early Bird", "Normal", "Night Owl"]} />,
      <DropDownMenu required="true" value={state?.values?.cleanliness} onChange={(e) => handleEmptyStringValidation(e, 'cleanliness')} label="Cleanliness" menuItem={["Not clean", "Clean", "Very Clean"]} />,
    ]} />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu required="true" value={state?.values?.drinking} onChange={(e) => handleEmptyStringValidation(e, 'drinking')} label="Drinking" menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]} />,
      <DropDownMenu required="true" value={state?.values?.smoking} onChange={(e) => handleEmptyStringValidation(e, 'smoking')} label="Smoking" menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]} />,
    ]} />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu required="true" value={state?.values?.cannabis} onChange={(e) => handleEmptyStringValidation(e, 'cannabis')} label="Cannabis" menuItem={["No Cannabis Use", "Light Cannabis Use", "Moderate Cannabis Use", "Heavy Cannabis User"]} />,
      <FormSingleLineInput required="true" value={state?.values?.occupation} onChange={(e) => handleEmptyStringValidation(e, 'occupation')} size="small" type="text" field="Occupation" placeHolder="ex. Student/Pharmacist" />,
    ]} />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu required="true" value={state?.values?.tolerateGuests} onChange={(e) => handleEmptyStringValidation(e, 'tolerateGuests')} label="Ok with guests?" menuItem={["Yes", "No"]} />,
      <DropDownMenu required="true" value={state?.values?.toleratePets} onChange={(e) => handleEmptyStringValidation(e, 'toleratePets')} label="Ok with pets?" menuItem={["Yes", "No"]} />,
    ]} />



    <ActionButton disabled={state.globalError} fontSize="15px" width="100%" onClick={() => { handleSubmit(state?.values); localStorage.setItem("page1", JSON.stringify(values)); }} type="submit" title="SUBMIT" endIcon={<IoChevronForward color="aqua" />} />
  </>)
}

export default ProfileMakerForm;