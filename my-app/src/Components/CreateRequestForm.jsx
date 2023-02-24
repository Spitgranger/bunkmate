import { useState, useReducer, useEffect } from 'react'
import { IoChevronBack } from 'react-icons/io5';
import {
  FormSection,
  ActionButton,
  LineBox,
  FormSingleLineInput,
  DatePicker,
  DropDownMenu,

} from './SubComponents/Form';

//styles
const backButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px'
}

//jsx code

function CreateRequestForm({ backwardButton }) {
  const actions = {
    checkGlobalError: "check_global_error",
    checkLocalError: "check_local_error", //TODO
    checkValues: "check_values",
    checkDate: "check_dates"
  }

  const page3 = JSON.parse(localStorage.getItem("page3"))
  const values = page3 || {
    cannabis: "",
    rentBudget: "",
    idealLocation: "",
    idealLengthStay: "",
    havePets: "",
    sleepSchedule: "",
    cleanliness: "",
    drinking: "",
    smoking: "",
    occupation: "",
    tolerateGuests: "",
    toleratePets: "",
    numRoommates: "",
    roommateAge: "",
    roommateGender: "",
    dateValue: "",
  }

  const initialState = {
    values: values,
    globalError: true,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmptyStringValidation = (e, name) => {
    dispatch({ type: actions.checkValues, payload: e.target.value, name: name })
    dispatch({ type: actions.checkGlobalError })
  }
  const handleDateChange = (newValue) => {
    dispatch({ type: actions.checkDate, payload: newValue })
  }
  /* calling reducer function again gets the next state*/
  reducer(state, { type: actions.checkValues })
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
          return { ...state, values: { ...state.values, dateValue: state.values.dateValue = action.payload.toISOString().split('T')[0] } }
        } catch (error) {
          return { ...state, values: { ...state.values, dateValue: "" } }
        }
      }
      case actions.checkValues: {
        return { ...state, values: { ...state.values, [action.name]: action.payload } };
      }
    }
    throw Error('unknown action: ' + action.type)
  }
  useEffect(() => {
    dispatch({ type: actions.checkGlobalError })
  }, [state.globalError, state.values.dateValue])



  return (<>
    <label style={{ cursor: 'pointer' }}>
      <input style={{ display: 'none' }} onClick={backwardButton} type="button" />
      <h3 style={backButtonStyles}>
        <IoChevronBack />Back</h3>
    </label>

    <FormSection message="*Some of the information here will be used to match you with roomates and some of it will be used to build your profile" />
    <FormSection title="Living Preferences" />

    <LineBox flex={true} CssTextField={[
      <DatePicker onChange={(newValue) => { handleDateChange(newValue); }} value={state.values.dateValue} label="Move in date" />,
      //$ input adornmnet start
      <FormSingleLineInput inputAdornment={true} inputAdornmentText={"$"} position={"start"} value={state?.values?.rentBudget} onChange={(e) => handleEmptyStringValidation(e, 'rentBudget')} size="small" field="Monthly Rent Budget" placeHolder="ex. 900" />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <FormSingleLineInput value={state?.values?.idealLocation} onChange={(e) => handleEmptyStringValidation(e, 'idealLocation')} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" />,
      <DropDownMenu defaultValue={""} value={state?.values?.idealLengthStay} onChange={(e) => handleEmptyStringValidation(e, 'idealLengthStay')} label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1 year plus"]} />,
    ]
    } />

    <br></br>
    <FormSection title="Habits and LifeStyle" />
    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultValue={""} value={state?.values?.havePets} onChange={(e) => handleEmptyStringValidation(e, 'havePets')} label="Do you have pets" menuItem={["Yes", "No"]} />,
      <DropDownMenu defaultValue={""} value={state?.values?.sleepSchedule} onChange={(e) => handleEmptyStringValidation(e, 'sleepSchedule')} label="Sleep Schedule" menuItem={["Early Bird", "Normal", "Night Owl"]} />,
      <DropDownMenu defaultValue={""} value={state?.values?.cleanliness} onChange={(e) => handleEmptyStringValidation(e, 'cleanliness')} label="Cleanliness" menuItem={["Not clean", "Clean", "Very Clean"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultvalue={""} value={state?.values?.drinking} onChange={(e) => handleEmptyStringValidation(e, 'drinking')} label="Drinking" menuItem={["Don't Drink", "Light Drinker", "Moderate Drinker", "Heavy Drinker"]} />,
      <DropDownMenu dfeaultValue={""} value={state?.values?.smoking} onChange={(e) => handleEmptyStringValidation(e, 'smoking')} label="Smoking" menuItem={["Don't Smoke", "Light Smoker", "Moderate Smoker", "Heavy Smoker"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu dfeaultValue={""} value={state?.values?.cannabis} onChange={(e) => handleEmptyStringValidation(e, 'cannabis')} label="Cannabis" menuItem={["No Cannabis Use", "Light Cannabis Use", "Moderate Cannabis Use", "Heavy Cannabis User"]} />,
      <FormSingleLineInput defaultValue={""} value={state?.values?.occupation} onChange={(e) => handleEmptyStringValidation(e, 'occupation')} size="small" type="text" field="Occupation" placeHolder="ex. Student/Pharmacist" />,
    ]
    } />

    <br></br>
    <FormSection title="Roomate Preferences" />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultValue={""} value={state?.values?.tolerateGuests} onChange={(e) => handleEmptyStringValidation(e, 'tolerateGuests')} label="Ok with guests?" menuItem={["Yes", "No"]} />,
      <DropDownMenu defaultValue={""} value={state?.values?.toleratePets} onChange={(e) => handleEmptyStringValidation(e, 'toleratePets')} label="Ok with pets?" menuItem={["Yes", "No"]} />,
    ]
    } />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultValue={""} value={state?.values?.roommateAge} onChange={(e) => handleEmptyStringValidation(e, 'roommateAge')} label="Preferred roomate age" menuItem={['18 - 25', '26 - 30', '31-35', '36-40', '40+']} />,
    ]} />
    <LineBox flex={true} CssTextField={[
      //slider
      <DropDownMenu defaultvalue={""} value={state?.values?.numRoommates} onChange={(e) => handleEmptyStringValidation(e, 'numRoommates')} label="Number of roomates" menuItem={["No Roomates", "1 Roomate", "2 Roomates", "3+ Roomates"]} />,
      <DropDownMenu defaultValue={""} value={state?.values?.roommateGender} onChange={(e) => handleEmptyStringValidation(e, 'roommateGender')} label="Preferred roomate gender" menuItem={["Male", "Female", "Other", "Any"]} />,
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

export default CreateRequestForm;