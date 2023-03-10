import { useState, useReducer, useContext, useEffect, useRef, useId } from 'react'
import { createRequest, getProfile } from '../api';
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
import { savedListingsData, identityMenuItems } from '../testing_data/SavedListingsData';
import { SavedListingItem } from './SubComponents/Bunkmates/SavedListingItem';
import { FormMultiLineInput } from './SubComponents/Form';
import { AboutValidationContext } from './GlobalStateManagement/ValidationContext';
import { MultipleSelectCheckmarks } from './SubComponents/Form';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IoIosArrowBack } from 'react-icons/io'
import { chatClientContext } from './GlobalStateManagement/MessageContext';
import { UploadFile } from './SubComponents/Form';
import { MdUpload } from 'react-icons/md';
import { getListings } from '../api';

//Within a modal window
function CreateRequestForm(props) {
  const { aboutError, aboutHelperText, handleAboutValidation } = useContext(AboutValidationContext);
  const { GetClientInfo, localStorageData } = useContext(chatClientContext)
  /*const { values, setValue } = useContext(ValuesObjectContext)*/
  //state management of listing array index
  //show or hide the body fields
  const [showBody, setShowBody] = useState(false)
  //show or hide the group fields
  const [showGroup, setShowGroup] = useState(false)
  //show or hide the back button
  const [showButton, setShowButton] = useState(null)
  //controls the title of the create request form
  const [formTitle, setFormTitle] = useState("Create a Bunkmate Request")
  //controls the title of the label on the rent budget field
  const [labelTitle, setLabelTitle] = useState("My Rent Budget")

  const actions = {
    checkGlobalError: "check_global_error",
    checkLocalError: "check_local_error", //TODO
    checkValues: "check_values",
    checkDate: "check_dates",
  }

  const page3 = JSON.parse(localStorage.getItem("page3"))

  const firstPageValues = {
    request: "",
    aboutUs: "",
    linkChats: "",
  }
  const secondPageValues = page3 || {
    listingObject: "",
    idealLocation: "",
    dateValue: "",
    rentBudget: "",
    flexibility: "",
    rangeSliderValue: "",
    roommateGender: "",
    numRoommates: "",
    address: "",
    idealLengthStay: "",
  }

  const initialState = {
    firstPageValues: firstPageValues,
    secondPageValues: secondPageValues,
    globalError: true,
  }
  const [list, setList] = useState({});
  const [menuItem, setMenuItem] = useState([]);
  useEffect(() => {
    async function listings() {
      const response = await getListings();
      return response;
    }
    listings().then((response) => {
      console.log(response.data.data);
      const items = response.data.data.map((element, index) => {
        return <SavedListingItem index={index} image={element.image} address={element.address} price={element.price} bedBath={element.bedBath} />
      });
      items.push("None");
      items.reverse();
      setMenuItem(items);
    });
    console.log(list)
  }, []);
  /*
  menuItem = list.map((element, index) => {
    return <SavedListingItem index={index} image={element.image} address={element.address} price={element.price} bedBath={element.bedBath} />
  });
  */
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmptyStringValidation = (newValue, name, page, date = false) => {
    if (date === true) {
      return (dispatch({ type: actions.checkDate, payload: newValue, page: page })
        , dispatch({ type: actions.checkGlobalError, page: page })
      )
    }
    dispatch({ type: actions.checkValues, payload: newValue, name: name, page: page })
    dispatch({ type: actions.checkGlobalError, page: page })
  }


  /* calling reducer function again gets the next state*/
  const newState = reducer(state, { type: actions.checkValues })

  function reducer(state, action) {
    console.log('firstpage', state?.firstPageValues)
    console.log('secondpage', state?.secondPageValues)
    switch (action.type) {
      case actions.checkGlobalError: {
        if (Object.values(state[action.page]).some(val => (val === "" || val === null))) {
          return { ...state, globalError: true }
        } else if (Object.values(state[action.page]).every(val => val !== "")) {
          return { ...state, globalError: false };
        }
        break;
      }
      case actions.checkDate: {
        try {
          action.payload.toISOString();
          return { ...state, [action.page]: { ...state[action.page], dateValue: action.payload.toISOString().split('T')[0] } }
        } catch (error) {
          return { ...state, [action.page]: { ...state[action.page], dateValue: "" } }
        }
      }
      case actions.checkValues: {
        return { ...state, [action.page]: { ...state[action.page], [action.name]: action.payload } };
      }
    }
    throw Error('unknown action: ' + action.type)
  }

  /*
  useEffect(() => {
    dispatch({ type: actions.checkGlobalError, page: 'secondPageValues' })
  }, [state?.globalError, index])
  */


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
      console.log(place)
      //set coordinates of the location
      const coordinates = [place?.geometry?.location?.lat(), place?.geometry?.location?.lng()];
      console.log(coordinates)
      //ideal location stores the coordinates
      dispatch({ type: actions.checkValues, payload: coordinates, name: "idealLocation", page: 'secondPageValues' });
      //set the address of the location
      dispatch({ type: actions.checkValues, payload: place?.formatted_address, name: "address", page: 'secondPageValues' });
      dispatch({ type: actions.checkGlobalError, page: 'secondPageValues' })
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

  }, [inputRef.current]);

  //useEffect in sync with listingObject
  useEffect(() => {
    if (state?.secondPageValues?.listingObject && state?.secondPageValues?.listingObject !== "None") {
      const address = state?.secondPageValues?.listingObject?.address;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0].geometry) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          const coordinates = [lat, lng]
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          dispatch({ type: actions.checkValues, payload: coordinates, name: "idealLocation", page: 'secondPageValues' })
          dispatch({ type: actions.checkValues, payload: address, name: "address", page: 'secondPageValues' })
          dispatch({ type: actions.checkGlobalError, page: 'secondPageValues' })
        } else {
          console.log(`Geocode Failed: ${status}`);
        }
      });

    }
  }, [state?.secondPageValues?.listingObject])

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
    dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue", page: 'secondPageValues' });
  }, [sliderArray])


  const handleRangeChange = (e, newValue) => {
    setSliderArray(newValue)
    dispatch({ type: actions.checkValues, payload: sliderArray, name: "rangeSliderValue", page: 'secondPageValues' });
  }




  //TODO
  //Convert from hard coded array index to directly storing address in values
  //incorporate useRef
  //Remove listing menu items
  //fetching stored data from api for saved listing

  const [groupChat, setGroupChat] = useState([])


  const instantiateChatClient = async () => {
    //to record channel names and id in state
    const chatClient = await GetClientInfo();
    console.log(chatClient)

    const filter = { type: 'messaging', members: { $in: [localStorageData?.result?._id] } };
    const sort = [{ last_message_at: -1 }];

    const channels = await chatClient?.queryChannels(filter, sort, {
      watch: true, // this is the default
      state: true,
    });

    console.log(channels)

    const channelNames = []
    const channelId = []
    console.log(channelId)

    channels.map((channel) => {
      if (channel.data.name !== undefined && channel.data.name !== "Bunkmate Support" && channel.data.name !== "Support Team") {
        if (Array.isArray(channel.data.name)) {
          channelNames.push((channel.data.name).join('  '))
          channelId.push((channel.cid))
        } else {
          channelNames.push(channel.data.name)
          channelId.push((channel.cid))
        }
      }
    })


    setGroupChat([channelNames, channelId])

  }
  const handleGroupChat = (e) => {
    const channelIdStorage = []
    const clientChannelNames = e.target.value
    clientChannelNames.map((channelName) => {
      //retrieve the index of the channelName within groupChat[0] and use that to match the channelId
      const channelIndex = groupChat[0].indexOf(channelName)
      channelIdStorage.push(groupChat[1][channelIndex])
    },
      //record the channel ID of the option that was selected
      dispatch({ type: actions.checkValues, payload: channelIdStorage, name: "linkGroupChatsIds", page: 'secondPageValues' })
      //dispatch function that adds channelIdStorage as a payload
    )

  }



  useEffect(() => {
    console.log(state.secondPageValues.listingObject)
    dispatch({ type: actions.checkGlobalError, page: 'firstPageValues' })
    if (state?.secondPageValues?.listingObject === "None") {
      //if the user changes their mind and switches back to None, then address and idealLocation are set back to empty string
      dispatch({ type: actions.checkValues, payload: "", name: "address", page: 'secondPageValues' })
      dispatch({ type: actions.checkValues, payload: "", name: "idealLocation", page: 'secondPageValues' })
      //if user has selected a listing then the flexibility should be empty string
      dispatch({ type: actions.checkValues, payload: "", name: "flexibility", page: 'secondPageValues' })
      dispatch({ type: actions.checkGlobalError, page: 'secondPageValues' })

    } else {
      //when the user doesn't select index 0 of listing in mind then flexibility is set to "0"
      dispatch({ type: actions.checkValues, payload: "0", name: "flexibility", page: 'secondPageValues' })
      dispatch({ type: actions.checkGlobalError, page: 'secondPageValues' })
    }
  }, [showGroup, state.secondPageValues.listingObject])

  useEffect(() => {
    //after completing the form and then switching back to firstpage will cause the globalerror to be set to false
    dispatch({ type: actions.checkGlobalError, page: 'firstPageValues' })
  }, [state?.firstPageValues?.request])



  //handle back click so you can change who you want to request as
  const handleBack = () => {
    setFormTitle("Create A Bunkmate Request")
    setShowBody(false)
    setShowButton(null)
    //set  request back  to empty string after clicking back button
    dispatch({ type: actions.checkValues, payload: "", name: "request", page: 'firstPageValues' })
  }

  //change state depending on who you're requesting as
  const handleRequestShow = (e) => {

    switch (e.target.value) {
      case identityMenuItems[0]:
        setShowBody(true)
        setFormTitle("Request As Myself")
        setLabelTitle("My Rent Budget")
        //this is not to record the value, this is to prevent it from selecting "as myself" if the user presses the backbutton
        setShowGroup(false)

        setShowButton(
          <IconButton onClick={handleBack}>
            <IoIosArrowBack />
          </IconButton>
        )
        break
      case identityMenuItems[1]:
        setShowGroup(true)
        break
    }
  }

  const handleContinue = () => {
    //logic that's executed when continue button is pressed
    setShowBody(true);
    setShowButton(
      <IconButton onClick={handleBack}>
        <IoIosArrowBack />
      </IconButton>);
    setFormTitle("Request As A Group");
    setLabelTitle("Group's Rent Budget")
  }

  const handleListingDisplay = () => {
    //only for the listing in field
    if (state?.secondPageValues?.listingObject === "None") {
      return ("None")
    } else {
      return (menuItem[state?.secondPageValues?.listingObject.index])
    }
  }


  return (
    <>

      <div className="close-button-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
        {showButton}
        <IconButton onClick={props.onClick}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <FormSection title={formTitle} />
      <br />

      {showBody ?
        <>
          <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true} maxHeight={250} value={handleListingDisplay() || "None"} onChange={(e) => { handleEmptyStringValidation(e.target.value?.props || "None", 'listingObject', 'secondPageValues'); }} label="Listing in Mind" menuItem={menuItem} />,
          ]} />

          {/*if the user has a listing in mind then we use the listing's coordinates else use their own coordinates*/}
          { /* TODO: find a more robust solution than hard coding the index use useRef*/}
          {
            state?.secondPageValues?.listingObject === "None" || !state?.secondPageValues?.listingObject
              ?
              < LineBox flex={true} CssTextField={[
                <FormSingleLineInput required={true} helperText="Create a pin on the map" value={state?.secondPageValues?.idealLocation} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'idealLocation', 'secondPageValues'); }} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto" inputRef={inputRef} />,
                <FormSingleLineInput required={false} helperText="How far can you relocate if needed?" type="number" inputAdornment={true} inputStartAdornment={"~"} inputEndAdornment={"km"} value={state?.secondPageValues?.flexibility} onChange={(e) => handleEmptyStringValidation(e.target.value, 'flexibility', 'secondPageValues')} size="small" field="Range Flexibility" placeHolder="ex. 30" />,
              ]} />
              :
              <LineBox flex={true} CssTextField={[
                <FormSingleLineInput required={true} helperText={"Coordinates have been set to the listing's location"} disabled={true} type="text" value={state?.secondPageValues?.idealLocation} size="small" field="Pin Location" placeHolder="ex. Toronto" />,
              ]} />
          }

          <LineBox flex={true} CssTextField={[
            <DatePicker required={true} onChange={(e) => { handleEmptyStringValidation(e, 'dateValue', 'secondPageValues', true); }} value={state?.secondPageValues?.dateValue} label="Move In Date" />,
            <FormSingleLineInput required={true} inputAdornment={true} inputStartAdornment={"$"} inputEndAdornment="/m" value={state?.secondPageValues?.rentBudget} onChange={(e) => handleEmptyStringValidation(e.target.value, 'rentBudget', 'secondPageValues')} size="small" field={labelTitle} type="number" placeHolder="ex. 900" />,

          ]} />

          <LineBox flex={true} CssTextField={[
            <DropDownMenu defaultValue="1-3 months" helperText="Optional" value={state?.secondPageValues?.idealLengthStay} onChange={(e) => handleEmptyStringValidation(e.target.value, 'idealLengthStay', 'secondPageValues')} label="Ideal length of stay" menuItem={["1-3 months", "4-6 months", "7-12 months", "1+ years"]} />,
            <Box sx={{ height: '0px' }}>
              <Typography>
                {"Preferred Age *"}
              </Typography>
              <Slider getAriaLabel={() => 'Temperature range'} slots onChange={handleRangeChange} valueLabelDisplay="auto" value={sliderArray} getAriaValueText={ariaValuetext} min={16} max={100} size="small" />
            </Box>,
          ]} />


          <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true} value={state?.secondPageValues?.roommateGender} onChange={(e) => handleEmptyStringValidation(e.target.value, 'roommateGender', 'secondPageValues')} label="Preferred Gender" menuItem={["Any", "Male", "Female", "Other"]} />,
            <DropDownMenu required={true} value={state?.secondPageValues?.numRoommates} onChange={(e) => handleEmptyStringValidation(e.target.value, 'numRoommates', 'secondPageValues')} label="Seeking..." menuItem={["1 Bunkmate", "2 Bunkmates", "3 Bunkmates", "4 Bunkmates", '5+ Bunkmates']} />,
          ]} />

          {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
          <ActionButton helperText="* Please fill out all required fields before continuing" disabled={state?.globalError} onClick={() => { props.onClick(); console.log({ ...state?.firstPageValues, ...state?.secondPageValues }); handleSubmit({ ...state?.firstPageValues, ...state?.secondPageValues }) }} fontSize="15px" width="100%" type="submit" title="Submit" />
        </>
        :
        <>
          {showGroup ?
            <>
              <LineBox flex={true} CssTextField={[
                <DropDownMenu required={true} autoFocus={true} maxHeight={250} value={state?.firstPageValues?.request} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues'); handleRequestShow(e); }} label="Request" menuItem={identityMenuItems} />,
              ]} />
              < LineBox flex={true} CssTextField={[
                <MultipleSelectCheckmarks helperText="Optional" title="Group tags" onChange={(e) => handleEmptyStringValidation(e.target.value, 'groupTags', 'firstPageValues')} menuItems={['Non Smokers', 'Have Pets', "Have Jobs", 'Students', 'Have Children', 'LGBTQ Friendly', 'Cannabis Friendly']} />,
                <MultipleSelectCheckmarks required={true} helperText="Optional" onChange={(e) => { handleEmptyStringValidation(e.target.value, 'linkChats', 'firstPageValues'); handleGroupChat(e) }} title="Link Chats" menuItems={groupChat[0]} />
              ]} />
              <LineBox flex={true} CssTextField={[
                <UploadFile height="40px" helperTextPos="85%" helperText="Optional: Supported Files: jpg, png" width="100%" fontSize="14px" endIcon={<MdUpload color="aqua" size={25} />} type="file" accept={["image/jpeg", "image/jpg", "image/png",]} message="Group Photo" />,
              ]} />
              <div id="multiline">
                <FormMultiLineInput required={true} placeHolder="Talk about your bunkmate(s)" type="text" field="About Us" helperText={aboutHelperText} onChange={(e) => { handleAboutValidation(e); handleEmptyStringValidation(e.target.value, 'aboutUs', 'firstPageValues') }} error={aboutError} value={state?.firstPageValues?.about} />
              </div>
              <ActionButton helperText="* Please fill out all required fields before continuing" disabled={state?.globalError} onClick={handleContinue} fontSize="15px" width="100%" type="submit" title="Continue" />
            </>
            :
            <LineBox flex={true} CssTextField={[
              <DropDownMenu required={true} autoFocus={true} maxHeight={250} value={state?.firstPageValues?.request} onChange={(e) => { handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues'); handleRequestShow(e); }} label="Request" menuItem={identityMenuItems} />,
            ]} />
          }
        </>
      }


    </>)
}

export default CreateRequestForm;