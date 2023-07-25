import {
    useState,
    useContext,
    ChangeEvent
} from 'react'
import {
    ActionButton,
    LineBox,
    DropDownMenu,
    FormMultiLineInput,
    MultipleSelectCheckmarks,
    UploadFileProps
} from "../../../../../Utils/types/form.ts";

import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const FirstPageForm = ({
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
    // const handleGroupChat = (e) => {
    //     console.log(e);
    //record the link group chat ids
    // let channelIdStorage = null;
    // const clientChannelNames = e
    // groupChat.forEach((element) => {
    //     if (element.usernames === clientChannelNames) {
    //         channelIdStorage = element.channel;
    //     }
    //     ;
    // });
    //record the channel ID of the option that was selected
    // dispatch({
    //     type: actions.checkValues,
    //     payload: channelIdStorage,
    //     name: "linkGroupChatsIds",
    //     page: 'secondPageValues'
    // })
    //dispatch function that adds channelIdStorage as a payload
    //}

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
            console.log('Image conversion error: ', error)
        };
    }
    return (<>
        <LineBox flex={true} CssTextField={[
            <DropDownMenu required={true}
                          autoFocus={true}
                          maxHeight={'250'}
                          disabled={false}
                          id={"request"}
                          name={"request"}
                          value={state?.firstPageValues?.request}
                          onChange={(e) => {
                              handleEmptyStringValidation(e.target.value, 'request', 'firstPageValues');
                              handleRequestShow(e);
                          }}
                          label="Request"
                          menuItem={identityMenuItems}/>,
        ]}/>
        {/* belongs below*/}
        < LineBox flex={true} CssTextField={[
            <MultipleSelectCheckmarks value={state?.firstPageValues?.groupTags} helperText="Optional" title="Group tags"
                                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmptyStringValidation(e.target.value, 'groupTags', 'firstPageValues')}
                                      menuItems={['Non Smokers', 'Have Pets', "Have Jobs", 'Students', 'Have Children', 'LGBTQ Friendly', 'Cannabis Friendly']}
                                      required={false}
            />,
            <DropDownMenu
                id={"linkChats"}
                name={"linkChats"}
                helperText={"Link your bunkmates"}
                required={true} value={chatMenuItems[index]}
                onChange={(e) => {
                    handleEmptyStringValidation(groupChat[e.explicitOriginalTarget.attributes.index.value].ids, 'linkChats', 'firstPageValues');
                    setIndex(e.explicitOriginalTarget.attributes.index.value)
                }} label="Link Chats" menuItem={chatMenuItems}/>,
        ]}/>
        <LineBox flex={true} CssTextField={[
            <UploadFile helperText="Optional: Supported Files: jpg, jpeg, png" helperTextPos="85%" width="100%"
                        height="40px" type="file" message="Upload Group Photo"
                        accept={"image/jpeg,image/png,image/jpg"}
                        endIcon={<CameraAltIcon sx={{color: "aqua"}}/>} handleFileUpload={handleFileUpload}/>,
        ]}/>
        <div id="multiline">
            <FormMultiLineInput
                id={"about"}
                name={"about"}
                required={true} placeHolder="Talk about your bunkmate(s)"
                field="About Us"
                onChange={(e) => {
                    handleAboutValidation(e);
                    handleEmptyStringValidation(e.target.value, 'aboutUs', 'firstPageValues')
                }} value={state?.firstPageValues?.aboutUs}/>
        </div>
        <ActionButton helperText="* Please fill out all required fields before continuing" disabled={state?.globalError}
                      onClick={handleContinue} fontSize="15px" width="100%" type="submit" title="Continue"/>
    </>)
}
