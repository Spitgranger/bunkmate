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

import { ValuesObjectContext } from './GlobalStateManagement/ValidationContext';



//Within a modal window
function CreateRequestForm({ onClick }) {

  /*const { values, setValue } = useContext(ValuesObjectContext)*/
  const id = useId();
  //state management of listing array index
  const [index, setIndex] = useState(0)
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
    idealLengthStay: "",
    rangeSliderValue: "",
    roommateGender: "",
    numRoommates: "",
  });

  const initialState = {
    values: values,
    globalError: true,
  }

  console.log(values)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmptyStringValidation = (newValue, name, date = false) => {
    if (date === true) {
      dispatch({ type: actions.checkDate, payload: newValue })
    }
    dispatch({ type: actions.checkValues, payload: newValue, name: name })
    dispatch({ type: actions.checkGlobalError })
  }


  /* calling reducer function again gets the next state*/
  reducer(state, { type: actions.checkValues })

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


  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "geometry", "formatted_address"],
    types: []
  };

  //useEffect runs when user selects from Autocomplete dropdown menu
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef?.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      //set coordinates of the location
      const coordinates = [place?.geometry?.location?.lat(), place?.geometry?.location?.lng()];
      dispatch({ type: actions.checkValues, payload: coordinates, name: "idealLocation" });
      //set the address of the location
      dispatch({ type: actions.checkValues, payload: place?.formatted_address, name: "address" });
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


  }, []);

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

  function SavedListingItem(props) {
    //map these values from the user's "saved listings" into "listings in mind" drop down menu
    return (
      <div className="saved-listing" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        {/*replace hard coded values */}
        <img style={{ width: "70px", height: "60px", padding: '5px', borderRadius: '10px' }} src="https://picsum.photos/300/300"></img>
        <div style={{ maxWidth: '350px', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '5px', }}>
          <Typography variant="body2" color="text.secondary" noWrap >
            {/*replace hard coded values */}
            {props.address}
          </Typography>
          <Typography component="div" fontWeight="bold" noWrap >
            {/*replace hard coded values */}
            {`${props.price}/month`}
          </Typography>
          <Typography component="div" fontWeight="normal" fontSize="small" noWrap >
            {/*replace hard coded values */}
            {props.bedBath}
          </Typography>

        </div>
      </div >
    )
  }

  //an array containing the user's stored saved listings
  const listingMenuItems =
    [<div index={0}>None</div>,
    <SavedListingItem
      index={1}
      id={`saved-listing-${id}`}
      image="https://www.contemporist.com/wp-content/uploads/2015/09/student-housing_050915_01.jpg"
      address="345 Horner Avenue, Etobicoke, ON, Canada"
      price="2800"
      bedBath="3 Beds | 2 Baths"
    />,
    <SavedListingItem
      index={2}
      id={`saved-listing-${id}`}
      image="https://hbrdnhlsprod.blob.core.windows.net/nhlsprod/uploads/ckeditor/pictures/344/content_Calgary_Condos_NHLS.jpg"
      address="Square One Shopping Centre, City Centre Drive, Mississauga, ON, Canada"
      price="2300"
      bedBath="4 Beds | 4 Baths"
    />,
    <SavedListingItem
      index={3}
      id={`saved-listing-${id}`}
      image="https://hbrdnhlsprod.blob.core.windows.net/nhlsprod/uploads/posting/logo/222352/large_square_1.jpg"
      address="2597 Cartwright Crescent, Mississauga, ON L5M, Canada"
      price="1200"
      bedBath="1 Beds | 1 Baths"
    />,
    <SavedListingItem
      index={4}
      id={`saved-listing-${id}`}
      image="https://www.contemporist.com/wp-content/uploads/2015/09/student-housing_050915_01.jpg"
      address="81 Bay Street, Toronto, ON, Canada"
      price="1200"
      bedBath="1 Beds | 1 Baths"
    />]



  function ariaValuetext(value) {
    return `${value}`;
  }

  const [sliderArray, setSliderArray] = useState([18, 40]);

  useEffect(() => {
    dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue" });
  }, [sliderArray])

  function RangeSlider(props) {

    const handleRangeChange = (e, newValue) => {
      setSliderArray(newValue)
      dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue" });
    }

    return (
      <Box sx={{ width: 300 }}>
        <Typography>
          {props.label}
        </Typography>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          slots
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          value={sliderArray}
          getAriaValueText={ariaValuetext}
          min={props.min}
          max={props.max}
        />
      </Box>
    );
  }



  //TODO
  //Convert from hard coded array index to directly storing address in values
  //incorporate useRef
  //Change condition index === 1 || index === 0 
  //Change remove setIndex and index
  //Remove listing menu items
  //fetching stored data from api for saved listing




  console.log(state?.values)
  return (<>

    <FormSection title="Create Bunkmate Request" />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu maxHeight={250} value={listingMenuItems[index]} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'listingObject'); setIndex(e.target.value.props.index) }} label="Listing in Mind"
        menuItem={listingMenuItems} />,
    ]} />

    {/* if the user has a listing in mind then we use the listing's coordinates else use their own coordinates*/}
    { /* TODO: find a more robust solution than hard coding the index use useRef*/}
    {index === 0 ?
      <LineBox flex={true} CssTextField={[
        <FormSingleLineInput disabled={false} value={state?.values?.listingObject?.props?.address} onChange={(e) => handleEmptyStringValidation(e.target.value, 'idealLocation')} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" inputRef={inputRef} />,
      ]} />
      :
      <LineBox flex={true} CssTextField={[
        <FormSingleLineInput helperText={"Coordinates have been set to your selected listing"} disabled={true} value={state?.values?.listingObject?.props?.address} onChange={(e) => { handleEmptyStringValidation(e.target.value, state?.values?.listingObject?.props?.address); }} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" inputRef={inputRef} />,
      ]} />
    }

    <LineBox flex={true} CssTextField={[
      <DatePicker onChange={(e) => { handleEmptyStringValidation(e, 'dateValue', true); }} value={state.values.dateValue} label="Move in date" />,
      <FormSingleLineInput inputAdornment={true} inputAdornmentText={"$"} position={"start"} value={state?.values?.rentBudget} onChange={(e) => handleEmptyStringValidation(e.target.value, 'rentBudget')} size="small" field="Monthly Rent Budget" placeHolder="ex. 900" />,
    ]} />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultValue={""} value={state?.values?.idealLengthStay} onChange={(e) => handleEmptyStringValidation(e.target.value, 'idealLengthStay')} label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1+ years"]} />,
      <RangeSlider min={16} max={100} label={"Preferred age range"} />,
    ]} />

    <LineBox flex={true} CssTextField={[
      <DropDownMenu defaultValue={""} value={state?.values?.roommateGender} onChange={(e) => handleEmptyStringValidation(e.target.value, 'roommateGender')} label="Preferred Gender" menuItem={["Any", "Male", "Female", "Other"]} />,
      <DropDownMenu defaultvalue={""} value={state?.values?.numRoommates} onChange={(e) => handleEmptyStringValidation(e.target.value, 'numRoommates')} label="Seeking" menuItem={["No Bunkmates", "1 Bunkmate", "2 Bunkmates", "3 Bunkmates", "4 Bunkmates", '5+ Bunkmates']} />,
    ]} />

    {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
    <ActionButton disabled={state?.globalError} onClick={() => { onClick(); handleSubmit(values); }} fontSize="15px" width="100%" type="submit" title="Submit" />
  </>)
}

export default CreateRequestForm;