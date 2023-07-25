import {
    useContext,
    useEffect,
    useRef,
} from 'react'
import {
    ActionButton,
    LineBox,
    FormSingleLineInput,
    DatePicker,
    DropDownMenu,
} from '../../../../Utils/form.tsx';
import {UserDataContext} from '../../../../globalContext/UserDataContext';
import {setRerender} from "../../../../features/bunkmate/bunkmateSlice.ts";

import {Typography} from '@mui/material'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';

export const SecondPageForm = ({
                                   handleEmptyStringValidation,
                                   state,
                                   dispatch,
                                   actions,
                                   labelTitle,
                                   props,
                                   listingsDataHashMap,
                                   listingsHashMap,
                                   identityMenuItems
                               }) => {

    //store user request data
    const {requestHandleSubmit, requestHandleUpdate} = useContext(UserDataContext)

    //used to rerender useEffect in Bunkmates.tsx containing async functions that gets data from backend
    //const reduxDispatch = useDispatch()


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
                //extract listing object leaving behind the rest of the object
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
    const handleRangeChange = (e: Event, newValue: number | number[]): void => {
        dispatch({
            type: actions.checkValues,
            payload: (newValue as number[]),
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
                        <FormSingleLineInput
                            id={"idealLocation"} name={"idealLocation"}
                            required={true} helperText="Create a pin on the map"
                            value={state?.secondPageValues?.idealLocation} onChange={(e) => {
                            handleEmptyStringValidation(e.target.value, 'idealLocation', 'secondPageValues');
                        }} size="small" type="text" field="Ideal Location" placeHolder="ex. Toronto"
                            inputRef={inputRef}/>,
                        <FormSingleLineInput
                            id={"flexibility"} name={"flexibility"}
                            required={false} helperText="How far can you move?" type="number"
                            inputAdornment={true} inputStartAdornment={"~"} inputEndAdornment={"km"}
                            value={state?.secondPageValues?.flexibility}
                            onChange={(e) => handleEmptyStringValidation(e.target.value, 'flexibility', 'secondPageValues')}
                            size="small" field="Range Flexibility" placeHolder="ex. 30"/>,
                    ]}/>
                    :
                    <LineBox flex={true} CssTextField={[
                        <FormSingleLineInput
                            id={"coordinates"}
                            name={"coordinates"}
                            required={true}
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
                    label="Move In Date"
                    error={false}
                    helperText={"TODO"}
                />,
                <FormSingleLineInput
                    id="rentBudget" name={"rentBudget"}
                    required={true} inputAdornment={true} inputStartAdornment={"$"}
                    inputEndAdornment="/m" value={state?.secondPageValues?.rentBudget}
                    onChange={(value) => handleEmptyStringValidation(value, 'rentBudget', 'secondPageValues')}
                    size="small" field={labelTitle} type="number" placeHolder="ex. 900"/>,

            ]}/>

            <LineBox flex={true} CssTextField={[
                <DropDownMenu
                    id={"idealLengthStay"}
                    name={"idealLengthStay"}
                    required={true}
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
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        value={state?.secondPageValues?.rangeSliderValue}
                        getAriaValueText={ariaValuetext}
                        min={16}
                        max={100}
                        size="small"/>
                </Box>,
            ]}/>


            <LineBox flex={true} CssTextField={[
                <DropDownMenu
                    id={"preferredGender"}
                    name={"preferredGender"}
                    required={true}
                    value={state?.secondPageValues?.roommateGender}
                    onChange={(e) => handleEmptyStringValidation(e.target.value, 'roommateGender', 'secondPageValues')}
                    label="Preferred Gender" menuItem={["Any", "Male", "Female", "Other"]}
                    disabled={false}
                />,
                <DropDownMenu
                    id={"seeking"}
                    name={"seeking"}
                    required={true}
                    value={state?.secondPageValues?.numRoommates}
                    onChange={(e) => handleEmptyStringValidation(e.target.value, 'numRoommates', 'secondPageValues')}
                    label="Seeking..."
                    menuItem={["1 Bunkmate", "2 Bunkmates", "3 Bunkmates", "4 Bunkmates", '5+ Bunkmates']}
                    disabled={false}
                />,
            ]}/>

            {/* disable continue button if the user has not filled out all mandatory fields and / or still has errors*/}
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
