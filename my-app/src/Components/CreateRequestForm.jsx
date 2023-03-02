import { useState, useReducer, useContext, useEffect, useRef, useId } from 'react'
import { createRequest } from '../api';
import {
  FormSection,
  ActionButton,
  LineBox,
  FormSingleLineInput,
  DatePicker,
  DropDownMenu,

} from './SubComponents/Form';
import { Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import { listingMenuItems, identityMenuItems } from '../testing_data/listingMenuItemData';
import { FormMultiLineInput } from './SubComponents/Form';
import { AboutValidationContext } from './GlobalStateManagement/ValidationContext';
import { MultipleSelectCheckmarks } from './SubComponents/Form';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';

//Within a modal window
function CreateRequestForm(props) {
  const { aboutError, aboutHelperText, handleAboutValidation } = useContext(AboutValidationContext);
  /*const { values, setValue } = useContext(ValuesObjectContext)*/
  //state management of listing array index
  const [index, setIndex] = useState(0)
  //show or hide the body fields
  const [showBody, setShowBody] = useState(false)
  //show or hide the group fields
  const [showGroup, setShowGroup] = useState(false)
  //show or hide the back button
  const [showButton, setShowButton] = useState(null)

  const actions = {
    checkGlobalError: "check_global_error",
    checkLocalError: "check_local_error", //TODO
    checkValues: "check_values",
    checkDate: "check_dates",
  }

  const page3 = JSON.parse(localStorage.getItem("page3"))

  const [values, setValues] = useState(page3 || {
    listingObject: "None",
    idealLocation: "",
    dateValue: "",
    rentBudget: "",
    flexibility: "",
    rangeSliderValue: "",
    roommateGender: "",
    numRoommates: "",
    address: "",
    request: "",
    idealLengthStay: "",
  });

  const initialState = {
    values: values,
    globalError: true,
  }


  console.log(values)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmptyStringValidation = (newValue, name, date = false) => {
    if (date === true) {
      return (dispatch({ type: actions.checkDate, payload: newValue })
        , dispatch({ type: actions.checkGlobalError })
      )
    }
    dispatch({ type: actions.checkValues, payload: newValue, name: name })
    dispatch({ type: actions.checkGlobalError })
  }


  /* calling reducer function again gets the next state*/
  reducer(state, { type: actions.checkValues })

  function reducer(state, action) {
    switch (action.type) {
      case actions.checkGlobalError: {
        if (Object.values(state?.values).some(val => (val === "" || val === null))) {
          return { ...state, globalError: true }
        } else if (Object.values(state?.values).every(val => val !== "")) {
          return { ...state, globalError: false };
        }
        break;
      }
      case actions.checkDate: {
        try {
          action.payload.toISOString();
          return { ...state, values: { ...state.values, dateValue: action.payload.toISOString().split('T')[0] } }
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
  }, [state?.globalError, index])


  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "geometry", "formatted_address"],
    types: []
  };

  //useEffect runs when user selects from Autocomplete dropdown menu
  useEffect(() => {
    console.log('hi')
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef?.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      //set coordinates of the location
      const coordinates = [place?.geometry?.location?.lat(), place?.geometry?.location?.lng()];
      //ideal location stores the coordinates
      dispatch({ type: actions.checkValues, payload: coordinates, name: "idealLocation" });
      //set the address of the location
      dispatch({ type: actions.checkValues, payload: place?.formatted_address, name: "address" });
      dispatch({ type: actions.checkGlobalError })
      //setValues({ ...values, city: place.address_components[3].long_name, country: place.address_components[6].long_name, province: place.address_components[5].long_name })

    });

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    }
    inputRef?.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputRef?.current?.removeEventListener('keydown', handleKeyDown);
    }

  }, [state?.values?.idealLocation]);

  //useEffect in sync with listingObject
  useEffect(() => {
    if (state.values.listingObject && state?.values?.listingObject?.props?.index > 0) {
      const address = state?.values?.listingObject?.props?.address;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0].geometry) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          const coordinates = [lat, lng]
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          dispatch({ type: actions.checkValues, payload: coordinates, name: "idealLocation" })
          dispatch({ type: actions.checkValues, payload: address, name: "address" })
          dispatch({ type: actions.checkGlobalError })
        } else {
          console.log(`Geocode Failed: ${status}`);
        }
      });

    }
  }, [state?.values?.listingObject])

  const handleSubmit = async (formData) => {
    //record values to be stored in the backend
    try {
      const response = await createRequest(formData);
      console.log(response);
    } catch (error) {
      console.log("An error has occured: ", error)
    }
  }

  /*
    console.log(state?.values)
    console.log(state)
  */

  //Slider 2 knobbed slider for preferred age range
  function ariaValuetext(value) {
    return `${value}`;
  }

  const [sliderArray, setSliderArray] = useState([18, 40]);

  useEffect(() => {
    dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue" });
  }, [sliderArray])


  const handleRangeChange = (e, newValue) => {
    setSliderArray(newValue)
    dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue" });
  }





  //TODO
  //Convert from hard coded array index to directly storing address in values
  //incorporate useRef
  //Change remove setIndex and index
  //Remove listing menu items
  //fetching stored data from api for saved listing


  useEffect(() => {
    //if the user changes their mind and switches back to None, then address and idealLocation are set back to empty string
    dispatch({ type: actions.checkValues, payload: "", name: "address" })
    dispatch({ type: actions.checkValues, payload: "", name: "idealLocation" })
    dispatch({ type: actions.checkGlobalError })
  }, [index === 0])

  const handleShow = (e) => {
    //change state depending on who you're requesting as
    const handleBack = () => {
      //handle back click so you can change who you want to request as
      setShowBody(false)
      setShowButton(null)
    }
    switch (e.target.value) {
      //request "as myself"
      case identityMenuItems[0]:
        setShowBody(true)
        dispatch({ type: actions.checkValues, payload: "As Myself", name: "request" })
        setShowGroup(false)

        setShowButton(
          <IconButton onClick={handleBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )
        break
      //request "as a group"
      case identityMenuItems[1]:
        setShowGroup(true)
        break
    }
  }



  console.log(state?.values)
  return (
    <>

      <div className="close-button-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
        {showButton}
        <IconButton onClick={props.onClick}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <FormSection title="Create A Bunkmate Request" />
      <br />

      {showBody ?
        <>
          <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true} maxHeight={250} value={state?.values?.listingObject} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'listingObject'); setIndex(e.target.value.props.index); }} label="Listing in Mind" menuItem={listingMenuItems} />,
          ]} />

          {/*if the user has a listing in mind then we use the listing's coordinates else use their own coordinates*/}
          { /* TODO: find a more robust solution than hard coding the index use useRef*/}
          {
            index === 0 ?
              <LineBox flex={true} CssTextField={[
                <FormSingleLineInput required={true} helperText="Create a pin on the map" value={state?.values?.idealLocation} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'idealLocation'); }} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" inputRef={inputRef} />,
                <FormSingleLineInput required={false} helperText="How far can you relocate if needed?" type="number" inputAdornment={true} inputStartAdornment={"~"} inputEndAdornment={"km"} value={state?.values?.flexibility} onChange={(e) => handleEmptyStringValidation(e.target.value, 'flexibility')} size="small" field="Range Flexibility" placeHolder="ex. 30" />,
              ]} />
              :
              <LineBox flex={true} CssTextField={[
                <FormSingleLineInput required={true} helperText={"Coordinates have been set to the listing's location"} disabled={true} type="text" value={state?.values?.idealLocation} size="small" field="Pin Location" placeHolder="ex. Toronto" />,
              ]} />
          }

          <LineBox flex={true} CssTextField={[
            <DatePicker required={true} onChange={(e) => { handleEmptyStringValidation(e, 'dateValue', true); }} value={state?.values?.dateValue} label="Move In Date" />,
            <FormSingleLineInput required={true} inputAdornment={true} inputStartAdornment={"$"} inputEndAdornment="/m" value={state?.values?.rentBudget} onChange={(e) => handleEmptyStringValidation(e.target.value, 'rentBudget')} size="small" field="My Rent Budget" type="number" placeHolder="ex. 900" />,

          ]} />

          <LineBox flex={true} CssTextField={[
            <DropDownMenu defaultValue="1-3 months" helperText="Optional" value={state?.values?.idealLengthStay} onChange={(e) => handleEmptyStringValidation(e.target.value, 'idealLengthStay')} label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1+ years"]} />,
            <Box sx={{ height: '0px' }}>
              <Typography>
                {"Preferred Age"}
              </Typography>
              <Slider getAriaLabel={() => 'Temperature range'} slots onChange={handleRangeChange} valueLabelDisplay="auto" value={sliderArray} getAriaValueText={ariaValuetext} min={16} max={100} size="small" />
            </Box>,
          ]} />


          <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true} value={state?.values?.roommateGender} onChange={(e) => handleEmptyStringValidation(e.target.value, 'roommateGender')} label="Preferred Gender" menuItem={["Any", "Male", "Female", "Other"]} />,
            <DropDownMenu required={true} value={state?.values?.numRoommates} onChange={(e) => handleEmptyStringValidation(e.target.value, 'numRoommates')} label="Seeking..." menuItem={["1 Bunkmate", "2 Bunkmates", "3 Bunkmates", "4 Bunkmates", '5+ Bunkmates']} />,
          ]} />

          {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
          <ActionButton helperText="* Please fill out all required fields before continuiing" disabled={state?.globalError} onClick={() => { props.onClick(); handleSubmit(values); }} fontSize="15px" width="100%" type="submit" title="Submit" />
        </>
        :
        <>
          {showGroup ?
            <>
              <LineBox flex={true} CssTextField={[
                <DropDownMenu required={true} autoFocus={true} maxHeight={250} value={state?.values?.request} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'request'); handleShow(e); }} label="Request" menuItem={identityMenuItems} />,
              ]} />
              < LineBox flex={true} CssTextField={[
                <MultipleSelectCheckmarks title="Group tags" menuItems={['Non Smokers', 'Have Pets', "Have Jobs", 'Students', 'Have Children', 'LGBTQ Friendly', 'Cannabis Friendly']} />
              ]} />
              <div id="multiline">
                <FormMultiLineInput required={true} placeHolder="Talk about your bunkmate(s)" type="text" field="About Us" helperText={aboutHelperText} onChange={(e) => { handleAboutValidation(e); handleEmptyStringValidation(e.target.value, 'about') }} error={aboutError} value={state?.values?.about} />
              </div>
              <LineBox flex={true} CssTextField={[
                <MultipleSelectCheckmarks required={true} title="Link Profile(s) *" menuItems={['Sam Muller', 'Jared Thompson', 'Linus Sebastian', 'Huzaifa Shahid', 'Danny Mei', 'Kevin Lu',]} />
              ]} />
              <ActionButton helperText="* Please fill out all required fields before continuiing" disabled={false} onClick={() => { handleSubmit(values); setShowBody(true) }} fontSize="15px" width="100%" type="submit" title="Continue" />
            </>
            :
            <LineBox flex={true} CssTextField={[
              <DropDownMenu required={true} autoFocus={true} maxHeight={250} value={state?.values?.request} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'request'); handleShow(e); }} label="Request" menuItem={identityMenuItems} />,
            ]} />
          }
        </>
      }


    </>)
}

export default CreateRequestForm;