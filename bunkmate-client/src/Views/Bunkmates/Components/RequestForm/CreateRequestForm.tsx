import React, {
    useState,
    useReducer,
    useEffect,
} from 'react'
import {getListings, getProfile} from '../../../../api';
import {
    FormSection,
    LineBox,
    DropDownMenu,
} from '../../../../Utils/form.tsx';
import {SavedListingItem} from '../Map/SavedListingItem.tsx';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {IoIosArrowBack} from 'react-icons/io'
import {Listing} from 'MapTypes'
import {FirstPageForm} from "./components/firstPage.tsx";
import {SecondPageForm} from "./components/secondPage.tsx"

//switch from 1st and 2nd page using request field
//retrieve and store user request data
//validation using formik and yup and store in backend
//google maps logic

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
    //const [userProfile, setUserProfile] = useState<string>("")
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
        /*
        async function handleProfile() {
            const profile = await getProfile();
            return profile;
        }*/

        async function listings() {
            return await getListings();
        }

        const RetrievedItem: string | null = localStorage.getItem("profile")

        //const profile = RetrievedItem ? JSON.parse(RetrievedItem).result._id : ""


        listings().then((response) => {
            //this WHOLE SECTION SHOULD PROBABLY MERGE INTO ONE BIG HASH MAP, APPLY THE LOGIC THERE
            setListingsDataHashMap(listingsDataHashMap.set("None", "None"))
            response.data.data.map((element: Listing, index: number) => {
                setListingsHashMap(listingsHashMap.set(element._id, element.address));
                setListingsDataHashMap(listingsDataHashMap.set(element._id,
                    <SavedListingItem index={index}
                                      image={element.image}
                                      address={element.address}
                                      price={element.price}
                                      bedBath={element.bedBath}/>));
                return <SavedListingItem
                    index={index}
                    image={element.image}
                    address={element.address}
                    price={element.price}
                    bedBath={element.bedBath}/>
            });

        });


        //store user profile data
        //handleProfile().then((profile) => setUserProfile(profile));
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

    const handleEmptyStringValidation = (newValue, name: string, page: string, date: boolean = false) => {
        if (date) {
            return (dispatch({type: actions.checkDate, payload: newValue, page: page})
                    , dispatch({type: actions.checkGlobalError, page: page})
            )
        }
        dispatch({type: actions.checkValues, payload: newValue, name: name, page: page})
        dispatch({type: actions.checkGlobalError, page: page})
    }


    /* calling reducer function again gets the next state*/
    reducer(state, {type: actions.checkValues})

    function reducer(state, action) {
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
            //after completing the form and then switching back to first page will cause the global error to be set to false
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
                            <DropDownMenu
                                id={"request"}
                                name={"request"}
                                disabled={false}
                                required={true}
                                autoFocus={true}
                                maxHeight={'250'}
                                value={state?.firstPageValues?.request}
                                onChange={(e) => {
                                    handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues');
                                    handleRequestShow(e);
                                }} label="Request"
                                menuItem={identityMenuItems}
                            />,
                        ]}/>
                    }
                </>
            }


        </>)
}

export default CreateRequestForm;
