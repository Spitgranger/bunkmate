import { useState, useReducer, useEffect } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  LineBox,
  FormSingleLineInput,
  DatePicker,
  DropDownMenu,
  DiscreteSliderMarks,

} from './SubComponents/Form';
import { IoChevronForward } from 'react-icons/io5';
import { MdUpload } from "react-icons/md"

//styles
const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}




//jsx code


function Lifestyle({ backwardButton, forwardButton }) {
  const actions = {
    checkGlobalError: "check_global_error",
    checkLocalError: "check_local_error", //TODO
    checkEmpty: "check_empty_string",
    checkValues: "check_values"
  }

  const page3 = JSON.parse(localStorage.getItem("page3"))
  const values = page3 || {
    rentBudget: "",
    idealLocation: "",
    idealLengthStay: "",
    havePets: "",
    sleepSchedule: "",
    cleanliness: "",
    drinking: "",
    smoking: "",
    occupation: "",
    allergies: "",
    tolerateGuests: "",
    toleratePets: "",
    numRoommates: "",
    roommateAge: "",
    roommateGender: "",
  }

  const initialState = {
    values: values,
    globalError: true,
    fieldError: {
      rentBudget: true,
      idealLocation: true,
      idealLengthStay: true,
      havePets: true,
      sleepSchedule: true,
      cleanliness: true,
      drinking: true,
      smoking: true,
      occupation: true,
      allergies: true,
      tolerateGuests: true,
      toleratePets: true,
      numRoommates: true,
      roommateAge: true,
      roommateGender: true,
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmptyStringValidation = (e, name) => {
    dispatch({ type: actions.checkValues, payload: e.target.value, name: name })
    dispatch({ type: actions.checkEmpty, payload: e.target.value, name: name })
    dispatch({ type: actions.checkGlobalError })
  }


  /* calling reducer function again gets the next state*/
  reducer(state, { type: actions.checkValues })

  function reducer(state, action) {
    switch (action.type) {
      case actions.checkGlobalError: {
        if (Object.values(state.values).some(val => val === "")) {
          return { ...state, globalError: state.globalError = true }
          //NOT VERY ROBUST PLEASE FIX LATER
        } else if (Object.values(state.values).every(val => val !== "")) {
          return { ...state, globalError: state.globalError = false };
        }
      }
      case actions.checkValues: {
        console.log(state.values)
        return { ...state, values: { ...state.values, [action.name]: action.payload } };
      }
      case actions.checkEmpty: {
        if (action.payload === "" || action.payload === undefined) {
          return { ...state, fieldError: { ...state.fieldError, [action.name]: true } };
        } else if (action.payload !== undefined || action.payload !== "") {
          return { ...state, fieldError: { ...state.fieldError, [action.name]: false } };
        }
      }
    }
    throw Error('unknown action: ' + action.type)
  }
  useEffect(() => {
    dispatch({ type: actions.checkGlobalError })
  }, [state.globalError])



  return (<>
    <label style={{ cursor: 'pointer' }}>
      <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
      <h3 style={backButtonStyles}>
        <IoChevronBack />Back</h3>
    </label>

    <FormSection message="*Some of the information here will be used to match you with roomates and some of it will be used to build your profile" />
    <FormSection title="Living Preferences" />

    <LineBox flex={true} CssTextField={[
      <DatePicker label="Move in date" />,
      //$ input adornmnet start
      <FormSingleLineInput value={state?.values?.rentBudget} onChange={(e) => handleEmptyStringValidation(e, 'rentBudget')} size="small" field="Rent Budget" placeHolder="ex. 900 dollars" />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput value={state?.values?.idealLocation} onChange={(e) => handleEmptyStringValidation(e, 'idealLocation')} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" />,
      <DropDownMenu value={state?.values?.idealLengthStay} onChange={(e) => handleEmptyStringValidation(e, 'idealLengthStay')} label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1 year plus"]} />,
    ]
    } />

    <br></br>
    <FormSection title="Habits and LifeStyle" />
    <LineBox flex={true} CssTextField={[
      <DropDownMenu value={state?.values?.havePets} onChange={(e) => handleEmptyStringValidation(e, 'havePets')} label="Do you have pets" menuItem={["Yes", "No"]} />,
      <DropDownMenu value={state?.values?.sleepSchedule} onChange={(e) => handleEmptyStringValidation(e, 'sleepSchedule')} label="Sleep Schedule" menuItem={["Early Bird", "Normal", "Night Owl"]} />,
      <DropDownMenu value={state?.values?.cleanliness} onChange={(e) => handleEmptyStringValidation(e, 'cleanliness')} label="Cleanliness" menuItem={["Not clean", "Clean", "Very Clean"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu value={state?.values?.drinking} onChange={(e) => handleEmptyStringValidation(e, 'drinking')} label="Drinking" menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]} />,
      <DropDownMenu value={state?.values?.smoking} onChange={(e) => handleEmptyStringValidation(e, 'smoking')} label="Smoking" menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput value={state?.values?.occupation} onChange={(e) => handleEmptyStringValidation(e, 'occupation')} size="small" type="text" field="Occupation" placeHolder="ex. Student/Pharmacist" />,
      <FormSingleLineInput value={state?.values?.allergies} onChange={(e) => handleEmptyStringValidation(e, 'allergies')} size="small" type="text" field="Allergies?" placeHolder="ex. None/Nuts/Shellfish" />,
    ]
    } />

    <br></br>
    <FormSection title="Roomate Preferences" />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu value={state?.values?.tolerateGuests} onChange={(e) => handleEmptyStringValidation(e, 'tolerateGuests')} label="Ok with guests?" menuItem={["Yes", "No"]} />,
      <DropDownMenu value={state?.values?.toleratePets} onChange={(e) => handleEmptyStringValidation(e, 'toleratePets')} label="Ok with pets?" menuItem={["Yes", "No"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu value={state?.values?.numRoommates} onChange={(e) => handleEmptyStringValidation(e, 'numRoommates')} label="Number of roomates" menuItem={["No Roomates", "1 Roomate", "2 Roomates", "3+ Roomates"]} />,
    ]} />
    <LineBox flex={true} CssTextField={[
      //slider
      <DropDownMenu value={state?.values?.roommateAge} onChange={(e) => handleEmptyStringValidation(e, 'roommateAge')} label="Prefered roomate age" menuItem={['18 - 25', '26 - 30', '31-35', '36-40', '40+']} />,
      <DropDownMenu value={state?.values?.roommateGender} onChange={(e) => handleEmptyStringValidation(e, 'roommateGender')} label="Prefered roomate gender" menuItem={["Male", "Female", "Other", "Any"]} />,
    ]
    }
    />
    <LineBox flex={true} CssTextField={[
      //slider
    ]
    }
    />
    {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
    <ActionButton disabled={state.globalError} onClick={() => { localStorage.setItem('page3', JSON.stringify(state.values)); }} fontSize="15px" width="100%" type="submit" title="Submit" />
  </>)
}

export default Lifestyle;