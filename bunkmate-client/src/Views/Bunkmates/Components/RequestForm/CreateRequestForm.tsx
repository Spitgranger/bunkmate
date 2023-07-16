import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
    useRef,
    EventHandler,
    SyntheticEvent,
    ChangeEvent
} from 'react'
import {getListings, getProfile} from '../../../../api';
import {
    FormSection,
    ActionButton,
    LineBox,
    FormSingleLineInput,
    DatePicker,
    DropDownMenu,
    FormMultiLineInput,
    MultipleSelectCheckmarks,
    UploadFile,
} from '../../../../Utils/form.tsx';
import {SavedListingItem} from '../Map/SavedListingItem.tsx';
import {UserDataContext} from '../../../../globalContext/UserDataContext';
import {setRerender} from "../../../../features/bunkmate/bunkmateSlice.ts";

import {Typography} from '@mui/material'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {IoIosArrowBack} from 'react-icons/io'
import {useDispatch} from "react-redux";

//TODO
//Convert from hard coded array index to directly storing address in values #FINISHED
//incorporate useRef #FINISHED
//Remove listing menu items #FINISHED
//fetching stored data from api for saved listing

const FirstPageForm = ({
                           groupChat,
                           dispatch,
                           state,
                           actions,
                           handleEmptyStringValidation,
                           handleRequestShow,
                           handleContinue
                       }) => {

    const {aboutError, aboutHelperText, handleAboutValidation} = useContext(AboutValidationContext);
    const [index, setIndex] = useState("");

    const handleGroupChat = (e) => {
        console.log(e);
        //record the link group chat ids
        let channelIdStorage = null;
        const clientChannelNames = e
        groupChat.forEach((element) => {
            if (element.usernames === clientChannelNames) {
                channelIdStorage = element.channel;
            }
            ;
        });
        //record the channel ID of the option that was selected
        dispatch({
            type: actions.checkValues,
            payload: channelIdStorage,
            name: "linkGroupChatsIds",
            page: 'secondPageValues'
        })
        //dispatch function that adds channelIdStorage as a payload
    }

    //an empty array is evaluated as truthy which is why ternary operator needed here
    const chatMenuItems = groupChat ? groupChat.map((item) => {
        return item.usernames
    }) : ""

    //special handle event function just to file uploads
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        handleConversion(file, (result) => {
            dispatch({type: actions.checkValues, payload: result, name: "groupPhoto", page: 'firstPageValues'});
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
    return (<>
        <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true} autoFocus={true} maxHeight={250} value={state?.firstPageValues?.request}
                          onChange={(e) => {
                              handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues');
                              handleRequestShow(e);
                          }} label="Request" menuItem={identityMenuItems}/>,
        ]}/>
        {/* belongs below*/}
        < LineBox flex={true} CssTextField={[
            <MultipleSelectCheckmarks value={state?.firstPageValues?.groupTags} helperText="Optional" title="Group tags"
                                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmptyStringValidation(e.target.value, 'groupTags', 'firstPageValues')}
                                      menuItems={['Non Smokers', 'Have Pets', "Have Jobs", 'Students', 'Have Children', 'LGBTQ Friendly', 'Cannabis Friendly']}
                                      required={false}
            />,
            <DropDownMenu helperText={"Link your bunkmates"} required={true} value={chatMenuItems[index]}
                          onChange={(e) => {
                              console.log(e.explicitOriginalTarget.attributes.index.value);
                              handleEmptyStringValidation(groupChat[e.explicitOriginalTarget.attributes.index.value].ids, 'linkChats', 'firstPageValues');
                              setIndex(e.explicitOriginalTarget.attributes.index.value)
                          }} label="Link Chats" menuItem={chatMenuItems}/>,
        ]}/>
        <LineBox flex={true} CssTextField={[
            <UploadFile helperText="Optional: Supported Files: jpg, jpeg, png" helperTextPos="85%" width="100%"
                        height="40px" type="file" message="Upload Group Photo"
                        accept={["image/jpg", "image/jpeg", "image/png"]}
                        endIcon={<CameraAltIcon sx={{color: "aqua"}}/>} handleFileUpload={handleFileUpload}/>,
        ]}/>
        <div id="multiline">
            <FormMultiLineInput required={true} placeHolder="Talk about your bunkmate(s)" type="text" field="About Us"
                                helperText={aboutHelperText} onChange={(e) => {
                handleAboutValidation(e);
                handleEmptyStringValidation(e.target.value, 'aboutUs', 'firstPageValues')
            }} error={aboutError} value={state?.firstPageValues?.aboutUs}/>
        </div>
        <ActionButton helperText="* Please fill out all required fields before continuing" disabled={state?.globalError}
                      onClick={handleContinue} fontSize="15px" width="100%" type="submit" title="Continue"/>
    </>)
}

const SecondPageForm = ({
                            handleEmptyStringValidation,
                            state,
                            dispatch,
                            actions,
                            labelTitle,
                            props,
                            listingsDataHashMap,
                            listingsHashMap,
                        }) => {

    //store user request data
    const {requestHandleSubmit, requestHandleUpdate} = useContext(UserDataContext)

    //used to rerender useEffect in Bunkmates.tsx containing async functions that gets data from backend
    const reduxDispatch = useDispatch()


    //Utilizing Google Maps api, for the "ideal location", and "listing in mind" fields
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {country: "ca"},
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
            dispatch({
                type: actions.checkValues,
                payload: coordinates,
                name: "idealLocation",
                page: 'secondPageValues'
            });
            //set the address of the location, also used as the validation to make sure that the user selects from the dropdown menu
            dispatch({
                type: actions.checkValues,
                payload: place?.formatted_address,
                name: "address",
                page: 'secondPageValues'
            });
            dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})
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

    //useEffect in sync with listingObject, extracts and converts the saved listing address into coordinates
    useEffect(() => {
        if (state?.secondPageValues?.listingObject && state?.secondPageValues?.listingObject !== "None") {

            const address = listingsHashMap.get(state?.secondPageValues?.listingObject)//state?.secondPageValues?.listingObject?.address;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({address}, (results, status) => {
                if (status === "OK" && results) {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    const coordinates = [lat, lng]
                    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                    dispatch({
                        type: actions.checkValues,
                        payload: coordinates,
                        name: "idealLocation",
                        page: 'secondPageValues'
                    })
                    dispatch({type: actions.checkValues, payload: address, name: "address", page: 'secondPageValues'})
                    dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})
                } else {
                    console.log(`Geocode Failed: ${status}`);
                }
            });

        }
    }, [state?.secondPageValues?.listingObject])


    const handleSubmit = () => {
        //only return the second page values if the user requests "as myself"
        const {listingObject, ...modifiedSecondPageValues} = state.secondPageValues
        const {request} = state.firstPageValues

        //update the button titles in Bunkmates.tsx
        if (state?.firstPageValues?.request === "As myself") {
            //if listing object is "None" then don't even submit a listingObject key
            if (state?.secondPageValues?.listingObject === "None") {
                //making sure to incorporate request from the firstPageValues as it is an essential field
                return ({request, ...modifiedSecondPageValues});
            } else {
                return ({request, ...state.secondPageValues});
            }
        } else if (state?.firstPageValues?.request === "As a group") {
            if (state?.secondPageValues?.listingObject === "None") {
                //extract listingobject leaving behind the rest of the object
                return ({...state.firstPageValues, ...modifiedSecondPageValues});
            } else {
                //record everything
                return ({...state.firstPageValues, ...state.secondPageValues});
            }
        }


    }


    //Slider 2 knobbed slider for preferred age range
    function ariaValuetext(value: number): string {
        return `${value}`;
    }

    //handle the recording of  the dual knob slider values
    const handleRangeChange: EventHandler<SyntheticEvent<Element, Event>> = (e): void => {
        dispatch({
            type: actions.checkValues,
            payload: e.target.value,
            name: "rangeSliderValue",
            page: 'secondPageValues'
        });
    }

    return (
        <>
            {/*<LineBox flex={true} CssTextField={[
                <DropDownMenu required={true} maxHeight={250} value={handleListingDisplay() ?? "None"}
                              onChange={(e) => {
                                  handleEmptyStringValidation(e.target.value?.props?.id || "None", 'listingObject', 'secondPageValues');
                              }} label="Listing in Mind" menuItem={Array.from(listingsDataHashMap.values())}/>,
            ]}/>
            */}
            {/*if the user has a listing in mind then we use the listing's coordinates else use their own coordinates*/}
            { /* TODO: find a more robust solution than hard coding the index use useRef*/}
            {
                state?.secondPageValues?.listingObject === "None" || !state?.secondPageValues?.listingObject
                    ?
                    < LineBox flex={true} CssTextField={[
                        <FormSingleLineInput required={true} helperText="Create a pin on the map"
                                             value={state?.secondPageValues?.idealLocation} onChange={(e) => {
                            handleEmptyStringValidation(e.target.value, 'idealLocation', 'secondPageValues');
                        }} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto"
                                             inputRef={inputRef}/>,
                        <FormSingleLineInput required={false} helperText="How far can you move?" type="number"
                                             inputAdornment={true} inputStartAdornment={"~"} inputEndAdornment={"km"}
                                             value={state?.secondPageValues?.flexibility}
                                             onChange={(e) => handleEmptyStringValidation(e.target.value, 'flexibility', 'secondPageValues')}
                                             size="small" field="Range Flexibility" placeHolder="ex. 30"/>,
                    ]}/>
                    :
                    <LineBox flex={true} CssTextField={[
                        <FormSingleLineInput required={true}
                                             helperText={"Coordinates have been set to the listing's location"}
                                             disabled={true} type="text" value={state?.secondPageValues?.idealLocation}
                                             size="small" field="Pin Location" placeHolder="ex. Toronto"/>,
                    ]}/>
            }

            <LineBox flex={true} CssTextField={[
                <DatePicker
                    required={true}
                    onChange={(e) => {
                        handleEmptyStringValidation(e, 'dateValue', 'secondPageValues', true);
                    }}
                    value={state?.secondPageValues?.dateValue}
                    disabled={false}
                    label="Move In Date"/>,
                <FormSingleLineInput required={true} inputAdornment={true} inputStartAdornment={"$"}
                                     inputEndAdornment="/m" value={state?.secondPageValues?.rentBudget}
                                     onChange={(value) => handleEmptyStringValidation(value, 'rentBudget', 'secondPageValues')}
                                     size="small" field={labelTitle} type="number" placeHolder="ex. 900"/>,

            ]}/>

            <LineBox flex={true} CssTextField={[
                <DropDownMenu required={true}
                              defaultValue="1-3 months"
                              value={state?.secondPageValues?.idealLengthStay}
                              onChange={(e) => handleEmptyStringValidation(e.target.value, 'idealLengthStay', 'secondPageValues')}
                              label="Ideal length of stay"
                              menuItem={["1-3 months", "4-6 months", "7-12 months", "1+ years"]}
                              disabled={false}/>,
                <Box sx={{height: '0px'}}>
                    <Typography>
                        {"Preferred Age *"}
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Bunkmate Age range'}
                        slots
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto" value={state?.secondPageValues?.rangeSliderValue}
                        getAriaValueText={ariaValuetext} min={16} max={100} size="small"/>
                </Box>,
            ]}/>


            <LineBox flex={true} CssTextField={[
                <DropDownMenu required={true}
                              value={state?.secondPageValues?.roommateGender}
                              onChange={(e) => handleEmptyStringValidation(e.target.value, 'roommateGender', 'secondPageValues')}
                              label="Preferred Gender" menuItem={["Any", "Male", "Female", "Other"]}
                              disabled={false}
                />,
                <DropDownMenu required={true} value={state?.secondPageValues?.numRoommates}
                              onChange={(e) => handleEmptyStringValidation(e.target.value, 'numRoommates', 'secondPageValues')}
                              label="Seeking..."
                              menuItem={["1 Bunkmate", "2 Bunkmates", "3 Bunkmates", "4 Bunkmates", '5+ Bunkmates']}
                              disabled={false}
                />,
            ]}/>

            {/* disable cotinue button if the user has not filled out all mandatory fields and / or still has errors*/}
            <ActionButton helperText="* Please fill out all required fields before continuing"
                          disabled={state?.globalError} onClick={() => {
                props.onClick();
                console.log({...state?.firstPageValues, ...state?.secondPageValues});
                props.userRequest ? requestHandleUpdate(props.userRequest._id, handleSubmit()).then(() => {
                    console.log("DONE");
                    dispatch(setRerender())
                }) : requestHandleSubmit(handleSubmit()).then(() => {
                    console.log("DONE");
                    dispatch(setRerender())
                });
                console.log(handleSubmit())
            }} fontSize="15px" width="100%" type="submit" title="Submit"/>
        </>
    )
}


function CreateRequestForm(props): React.ReactElement {
    //state management of listing array index
    //show or hide the body fields
    const [showSecondPage, setShowSecondPage] = useState<boolean>(false)
    //show or hide the group fields
    const [showFirstPage, setShowFirstPage] = useState<boolean>(false)
    //show or hide the back button
    const [showButton, setShowButton] = useState<string>("")
    //controls the title of the create request form
    const [formTitle, setFormTitle] = useState<string>("Create Bunkmate Request")
    //controls the title of the label on the rent budget field
    const [labelTitle, setLabelTitle] = useState<string>("My Rent Budget")
    //store user profile data
    const [userProfile, setUserProfile] = useState<string>("")
    //state management for link chats field
    const [groupChat, setGroupChat] = useState<[]>([]);
    //state management for listing in mind field
    const [listingsHashMap, setListingsHashMap] = useState(new Map());
    const [listingsDataHashMap, setListingsDataHashMap] = useState(new Map());

    /* useState hook for managing the upload file ui state
    (placed in parent hook to preserve state when switching between components occupying
    the same position in the dom)*/

    //TODO
    //const [storedFile, setStoredFile] = useState("")

    //extract values from larger object
    const extractKeys: string[] = [
        'request',
        'groupTags',
        'aboutUs',
        'linkChats',
        'listingObject',
        'idealLocation',
        'dateValue',
        'address',
        'rentBudget',
        'flexibility',
        'rangeSliderValue',
        'roommateGender',
        'numRoommates',
        'idealLengthStay',
    ];


    //if listing object doesn't exist then remove from keys to extract
    if (!props?.userRequest?.listingObject) {
        extractKeys.splice(0, 1)
    }

    const combinedUserRequest = extractKeys.reduce((obj: {}, key: number) => {
        if (props?.userRequest?.hasOwnProperty(key)) {
            obj[key] = props?.userRequest[key];
        }
        return obj;
    }, {});


    //check if object is empty
    function handleCheckEmpty() {
        //empty when user hasn't made a request yet
        if (Object.keys(combinedUserRequest).length === 0) {
            const userFirstPageRequest = null
            const userSecondPageRequest = null
            return [userFirstPageRequest, userSecondPageRequest]
        } else {
            const {aboutUs, linkChats, request, groupTags, ...userSecondPageRequest} = combinedUserRequest
            const userFirstPageRequest = {aboutUs, linkChats, request, groupTags}
            return [userFirstPageRequest, userSecondPageRequest]
        }
    }

    const userFirstPageRequest = handleCheckEmpty()[0]
    const userSecondPageRequest = handleCheckEmpty()[1]

    useEffect(() => {
        //get backend data
        //get profile data from backend
        async function handleProfile() {
            const profile = await getProfile();
            return profile;
        }

        async function listings() {
            return await getListings();
        }

        const RetrievedItem: string | null = localStorage.getItem("profile")

        const profile = RetrievedItem ? JSON.parse(RetrievedItem).result._id : ""


        listings().then((response) => {
            //this WHOLE SECTION SHOULD PROBABLY MERGE INTO ONE BIG HASH MAP, APPLY THE LOGIC THERE
            setListingsDataHashMap(listingsDataHashMap.set("None", "None"))
            const items = response.data.data.map((element, index) => {
                setListingsHashMap(listingsHashMap.set(element._id, element.address));
                setListingsDataHashMap(listingsDataHashMap.set(element._id, <SavedListingItem id={element._id}
                                                                                              index={index}
                                                                                              image={element.image}
                                                                                              address={element.address}
                                                                                              price={element.price}
                                                                                              bedBath={element.bedBath}/>));
                return <SavedListingItem id={element._id} index={index} image={element.image} address={element.address}
                                         price={element.price} bedBath={element.bedBath}/>
            });

        });


        //store user profile data
        handleProfile().then((profile) => setUserProfile(profile));
        //decides what to display as the form title
        if (userSecondPageRequest) {
            setFormTitle("Edit Bunkmate Request")
        } else if (!userSecondPageRequest) {
            setFormTitle("Create Bunkmate Request")
        }

    }, [])


    const actions = {
        checkGlobalError: "check_global_error",
        checkLocalError: "check_local_error", //TODO
        checkValues: "check_values",
        checkDate: "check_dates",
    }

    const firstPageValues = userFirstPageRequest || {
        request: "",
        aboutUs: "",
        linkChats: "",
    }

    const secondPageValues = userSecondPageRequest || {
        listingObject: "None",
        idealLocation: "",
        dateValue: "",
        rentBudget: "",
        flexibility: "",
        rangeSliderValue: [18, 40],
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

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleEmptyStringValidation = (newValue, name, page, date = false) => {
        if (date === true) {
            return (dispatch({type: actions.checkDate, payload: newValue, page: page})
                    , dispatch({type: actions.checkGlobalError, page: page})
            )
        }
        dispatch({type: actions.checkValues, payload: newValue, name: name, page: page})
        dispatch({type: actions.checkGlobalError, page: page})
    }


    /* calling reducer function again gets the next state*/
    const checkValues = reducer(state, {type: actions.checkValues})

    function reducer(state, action) {
        console.log('firstpage', state?.firstPageValues)
        console.log('secondpage', state?.secondPageValues)
        switch (action.type) {
            case actions.checkGlobalError: {
                if (Object.values(state[action.page]).some(val => (val === "" || val === null))) {
                    return {...state, globalError: true}
                } else if (Object.values(state[action.page]).every(val => val !== "")) {
                    return {...state, globalError: false};
                }
                break;
            }
            case actions.checkDate: {
                try {
                    action.payload.toISOString();
                    return {
                        ...state,
                        [action.page]: {...state[action.page], dateValue: action.payload.toISOString().split('T')[0]}
                    }
                } catch (error) {
                    return {...state, [action.page]: {...state[action.page], dateValue: ""}}
                }
            }
            case actions.checkValues: {
                return {...state, [action.page]: {...state[action.page], [action.name]: action.payload}};
            }
        }
        throw Error('unknown action: ' + action.type)
    }


    useEffect(() => {
        //console.log(state.secondPageValues.listingObject)
        dispatch({type: actions.checkGlobalError, page: 'firstPageValues'})
        if (state?.secondPageValues?.listingObject === "None") {
            //if the user changes their mind and switches back to None, then address and idealLocation are set back to empty string
            dispatch({type: actions.checkValues, payload: "", name: "address", page: 'secondPageValues'})
            dispatch({type: actions.checkValues, payload: "", name: "idealLocation", page: 'secondPageValues'})
            //if user has selected a listing then the flexibility should be empty string
            dispatch({type: actions.checkValues, payload: "", name: "flexibility", page: 'secondPageValues'})
            dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})

            //if listingObject isn't equal to none and is defined then execute the code (second condition is for when user has already made request)
        } else if (state?.secondPageValues.listingObject !== "None" && state?.secondPageValues?.listingObject) {
            //when the user doesn't select index 0 of listing in mind then flexibility is set to "0"
            dispatch({type: actions.checkValues, payload: "0", name: "flexibility", page: 'secondPageValues'})
            dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})
        }
    }, [showFirstPage, state.secondPageValues.listingObject])

    useEffect(() => {
        if (state?.firstPageValues?.request === 'As myself') {
            //after completing the form and then switching back to firstpage will cause the globalerror to be set to false
            setShowSecondPage(true)
            setShowButton(
                <IconButton onClick={handleBack}>
                    <IoIosArrowBack/>
                </IconButton>);
            dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})
        } else if (state?.firstPageValues?.request === 'As a group') {
            //makes sure that the checkGlobalError runs after user decides to edit their bunkmate request
            setShowSecondPage(false)
            setShowFirstPage(true)
            dispatch({type: actions.checkGlobalError, page: 'firstPageValues'})
        }
    }, [state?.firstPageValues?.request, props.onClick])


    //handle back click so you can change who you want to request as
    const handleBack = () => {
        if (!userSecondPageRequest) {
            setFormTitle("Create Bunkmate Request")
            /*
            if (state?.firstPageValues?.request === "As myself" || state?.firstPageValues?.request === "") {
              dispatch({ type: actions.checkValues, payload: "", name: "request", page: 'firstPageValues' })
            }
            */
        } else if (userSecondPageRequest) {
            setFormTitle("Edit Bunkmate Request")
            //broken
            /*
            if (state?.firstPageValues?.request === "As myself" || !state?.firstPageValues?.request) {
              dispatch({ type: actions.checkValues, payload: "", name: "request", page: 'firstPageValues' })
            }
            */
            //this method causes request to be recorded as null sometimes
            dispatch({type: actions.checkValues, payload: "", name: "request", page: 'firstPageValues'})
        }
        setShowSecondPage(false)
        setShowButton(null)
        dispatch({type: actions.checkGlobalError, page: 'firstPageValues'})
    }

    //change state depending on who you're requesting as
    const handleRequestShow = (e) => {

        switch (e.target.value) {
            case identityMenuItems[0]:
                setFormTitle("Request As Myself")
                setLabelTitle("My Rent Budget")
                //this is not to record the value, this is to prevent it from selecting "as myself" if the user presses the backbutton
                setShowSecondPage(true)
                dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})

                setShowButton(
                    <IconButton onClick={handleBack}>
                        <IoIosArrowBack/>
                    </IconButton>
                )
                break
            case identityMenuItems[1]:
                setShowFirstPage(true)
                break
        }
    }

    const handleContinue = () => {
        //logic that's executed when continue button is pressed
        dispatch({type: actions.checkGlobalError, page: 'secondPageValues'})
        setShowSecondPage(true);
        setShowButton(
            <IconButton onClick={handleBack}>
                <IoIosArrowBack/>
            </IconButton>);
        setFormTitle("Request As A Group");
        setLabelTitle("Group's Rent Budget")
    }

    return (
        <>
            <div className="close-button-container"
                 style={{display: 'flex', justifyContent: 'space-between', width: '100%',}}>
                {showButton}
                <IconButton onClick={props.onClick}>
                    <CloseRoundedIcon/>
                </IconButton>
            </div>
            <FormSection title={formTitle}/>
            <br/>

            {showSecondPage
                ? <SecondPageForm
                    state={state}
                    dispatch={dispatch}
                    actions={actions}
                    handleEmptyStringValidation={handleEmptyStringValidation}
                    props={props}
                    groupChat={groupChat}
                    setGroupChat={setGroupChat}
                    labelTitle={labelTitle}
                    listingsDataHashMap={listingsDataHashMap}
                    listingsHashMap={listingsHashMap}
                    combinedUserRequest={combinedUserRequest}
                />
                : <>
                    {showFirstPage
                        ? <FirstPageForm
                            groupChat={groupChat}
                            setGroupChat={setGroupChat}
                            state={state}
                            dispatch={dispatch}
                            actions={actions}
                            handleEmptyStringValidation={handleEmptyStringValidation}
                            handleRequestShow={handleRequestShow}
                            handleContinue={handleContinue}
                            handleBack={handleBack}
                        />
                        :
                        <LineBox flex={true} CssTextField={[
                            <DropDownMenu required={true} autoFocus={true} maxHeight={250}
                                          value={state?.firstPageValues?.request} onChange={(e) => {
                                handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues');
                                handleRequestShow(e);
                            }} label="Request" menuItem={identityMenuItems}/>,
                        ]}/>
                    }
                </>
            }


        </>)
}

export default CreateRequestForm;
