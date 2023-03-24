import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  VirtualizedMessageList,
  useMessageContext,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChannelActionContext,
  useChannelStateContext,
  useChannelDeletedListener,
  ChannelPreviewMessenger,
  Avatar,
  DateSeparator,
} from 'stream-chat-react';
import CircularProgress from '@mui/material/CircularProgress';

import Navbar from '../../Components/Navbar';
import SignInProvider from '../../Components/GlobalStateManagement/SignInContext';
import { useClient } from './hooks/useClient';
import './Messages.css';

import { IoMdMore } from 'react-icons/io'
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider, { dividerClasses } from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import IconButton from '@mui/material/IconButton';
import { IoIosExit } from 'react-icons/io'
import { Navigate } from 'react-router';
import 'stream-chat-react/dist/css/v2/index.css';
import CreateChannel from '../../Components/CreateGroupChannel'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip'
import { getProfile } from '../../api';
import { Buffer } from 'buffer-es6'
import { MessageProvider } from 'stream-chat-react';

const Messages = () => {
  //controls whether to show the message list page or create group page
  const [isCreating, setIsCreating] = useState("")

  //controls the state of the button that controls the open and close state of the create group page
  const profile = JSON.parse(localStorage.getItem('profile'));
  const apiKey = process.env.REACT_APP_STREAM_API_KEY;
  const hasShownMessage = localStorage.getItem('hasShownMessage')
  /*
  //Initialize a new support user
  const supportToken = ''
  const supportUser = {
    id: "63f3d67b61c9a3d254621140",
    name: "Support Team",
    image: 'https://picsum.photos/200'
  };
  const supportClient = useClient({ apiKey: apiKey, userData: supportUser, tokenOrProvider: supportToken });
  */
  //Initialize a regular user 
  const userToken = profile?.streamToken;
  const [userProfile, setUserProfile] = useState("");

  //Used to handle retrieving user data from api
  const handleProfile = async () => {
    const profile = await getProfile();
    return profile
  }
  //get data from backend when the component first loads works
  useEffect(() => {
    handleProfile().then((profile) => setUserProfile(profile.data)).catch(error => console.log(error))
  }, []);

  console.log('profile', profile);

  const user = {
    id: profile?.result?._id,
    name: userProfile?.firstName,
    //doesn't work
    //image: userProfile?.picture
    image: 'https://picsum.photos/200/300'

  };

  const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });

  /*
  //Creating a custom support channel
  /*
  if (supportClient) {

    const supportChannel = supportClient.channel('messaging', {
      name: "Bunkmate Support",
      image: 'https://t4.ftcdn.net/jpg/01/36/75/37/360_F_136753727_wNMYxIesFtm7ecMeMehDu5yYCtLOAxCx.jpg',
      members: [profile?.result?._id, '63f3d67b61c9a3d254621140'],
    });

    supportChannel.sendMessage({
      text: 'Hi! How can we help you today?',
    });

    supportChannel.watch()
    localStorage.setItem('hasShownMessage', true);

  }
*/

  if (!profile) {
    return (
      <>
        <div style={{ height: '9vh' }} />
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '100px' }}>
          <h1 style={{ height: '49px' }}>You need to be logged in to message</h1>
        </div>
      </>
    )
  }
  if (!chatClient) return (<div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} ><CircularProgress size={50} />
  </div >)

  console.log(chatClient)
  //Channel with the most recent message will appear at the top of the message list
  const sort = { last_message_at: -1 };
  //message limit controls for much history is stored (not sure if it will increase costs)
  //message_limit: 100
  const options = { state: true, presence: true, limit: 10 };
  //this code filters for channels the user is a part of
  const filters = { type: 'messaging', members: { $in: [profile ? profile.result._id : null] } };

  //displays message when user edits a message
  //https://getstream.io/chat/docs/sdk/react/guides/customization/adding_messagelist_notification/
  const ChannelInner = () => {
    const { addNotification } = useChannelActionContext();
    const { channel } = useChannelStateContext();

    useEffect(() => {
      const clickToAddNotification = () => {
        addNotification('A message has been edited!', 'success');
      };

      channel.on('message.updated', clickToAddNotification);

      return () => {
        channel.off('message.updated', clickToAddNotification);
      };
    }, [addNotification, channel]);

  }

  console.log(chatClient.activeChannels)

  const CustomPreviewChannel = (props) => {
    //manages state for time since last message
    console.log(props)
    const [timeLastMessage, setTimeLastMessage] = useState("");
    const { displayImage, online, activeChannel, watchers, active, channel, displayTitle, unread, lastMessage, setActiveChannel } = props

    /*console.log('print avatar', props.Avatar(props).props.className)*/
    //calculates the last time the message was sent
    useEffect(() => {
      const updateMessageTime = () => {
        const dateString = lastMessage?.updated_at;
        const now = new Date();
        const date = new Date(dateString);

        const millisecondsDifference = now.getTime() - date.getTime(); //milliseconds
        const secondsDifference = Math.round(millisecondsDifference / 1000); //seconds
        const minutesDifference = Math.round(millisecondsDifference / 60000); //minutes
        const hoursDifference = Math.round(millisecondsDifference / 3600000); //hours
        const daysDifference = Math.round(millisecondsDifference / 86400000); //days
        const timeValues = { millisecondsDifference, secondsDifference, minutesDifference, hoursDifference, daysDifference }
        setTimeLastMessage(displayTime(timeValues, lastMessage));
      };
      //retrieve membres within a channel
      const members = activeChannel?.data?.name

      console.log(channel)
      //run the update immediately when the effect is defined
      updateMessageTime();

      //set up the interval to update every 30 seconds
      const intervalId = setInterval(updateMessageTime, 30000);

      //clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [lastMessage])

    //decides whether to show seconds, minutes hours or days 
    const displayTime = (timeValues, lastMessage) => {
      //If there is no message history return empty string
      if (!lastMessage) {
        return ("")
      }
      switch (true) {
        case (timeValues.millisecondsDifference < 60000)://if less than 60 seconds passed display seconds
          return `${timeValues.secondsDifference}s`
        case (timeValues.millisecondsDifference >= 60000 && timeValues.millisecondsDifference <= 3600000)://if more than a minute passed and less than an hour display minutes
          return `${timeValues.minutesDifference}m`
        case (timeValues.millisecondsDifference > 3600000 && timeValues.millisecondsDifference <= 86400000)://if more than an hour passed and less 24 hours display hours
          return `${timeValues.hoursDifference}h`
        case (timeValues.millisecondsDifference > 86400000)://if more than 24 hours passed then display days
          return `${timeValues.daysDifference}d`
        default:
          return `${timeValues.minutesDifference}m`
      }
    }

    //handle deletion of users
    async function handleDelete() {
      await channel.hide(null, true);

    }

    //function to handle closing of dropdown menu
    function handleClose() {
      setAnchorEl(null);
    };


    const displayNumberUnread = (unread) => {
      //if number of unread messages is 0 return nothing, 
      //else if urnead messages is greater than 0 and less than/equal to 99 return unread
      //else unread messages greater than 99 return '99+'
      return (unread === 0 ? null : (
        //max number of unread messages on the backend side is 255
        unread > 99 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', backgroundColor: 'red', color: 'white', height: '15px', minWidth: '15px' }}>
            <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0px', fontWeight: '800' }} >
              {'99+'}
            </h5>
          </div >
          :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', backgroundColor: 'red', color: 'white', height: '15px', minWidth: '15px' }}>
            <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0px', fontWeight: '800' }} >
              {unread}
            </h5>
          </div>
      ));
    }
    //display the last message sent in the preview
    const displayLastMessageUser = (profile, lastMessage) => {
      if (lastMessage === undefined) {
        return ("Send a message")
      } else {
        return (profile?.result?.name === lastMessage.user.name ? "You: " : "")
      }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    //might be using wrong client
    const handleInvite = () => {
      const channel = chatClient.channel('messaging', 'Group', { name: `${profile?.result?.name}'s Group` })
      channel.addMembers(
        [activeChannel.state.membership.user.id],
        { text: `${activeChannel.state.membership.user.name} has joined the group` },
        { hide_history: true })
    }

    console.log(props)
    return (
      <>
        <button style={active ? { display: 'flex', backgroundColor: 'white' } : null} className="channelPreview" onClick={() => { setActiveChannel(channel, watchers); setIsCreating(false); }}>
          <div style={{ padding: '5px' }}>
            {/*add ability to add user profile image*/}
            {/*<Avatar name={displayTitle} size={40} />*/}
            <Avatar name={displayTitle} image={displayImage} />

          </div>
          {/* Mainly controls for the size of the last message prevew*/}
          <div style={{ width: '60%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', padding: '5px', width: '100%', whiteSpace: 'nowrap', }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {displayTitle}
              </div>
            </div>
            <div className="lastMessageAndTime" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '350', paddingLeft: '5px', whiteSpace: 'nowrap' }}>
                {displayLastMessageUser(profile, lastMessage)}
                {lastMessage?.text}
              </div>
              <div style={{ marginLeft: '5px' }} >
                {`${timeLastMessage}`}
              </div>
            </div>
          </div>
          <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <IoMdMore size={20} />
            </IconButton>
            <Menu
              id="customized-menu"
              MenuListProps={{
                'aria-labelledby': 'customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleInvite} >
                <ArchiveIcon size={20} />
                Invite to Group
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={() => { handleDelete(); }} >
                <IoIosExit size={25} />
                Leave Group
              </MenuItem>
              <MenuItem onClick={() => { handleDelete(); }} >
                <IoIosExit size={25} />
                Mute Group
              </MenuItem>
            </Menu >
            {displayNumberUnread(unread)}
          </div>
        </button >
      </>
    )
  }

  /*
    const DropDown = (props) => console.log(props)
    const additionalProps = {
      DropDownContainer: DropDown,
      searchForChannels: true,
    }
  */

  //handle create group button press
  const handleCreateGroup = () => {
    setIsCreating(!isCreating)
  }


  return (
    <div className="messages">
      <div style={{ height: '9vh' }} />
      <Navbar />
      <Tooltip title={isCreating ? "Cancel Creating Group" : "Create Group"}>
        <IconButton onClick={handleCreateGroup}>
          {isCreating ? <CancelIcon /> : <AddCircleIcon />}
        </IconButton>
      </Tooltip>
      <Chat client={chatClient} theme='str-chat__theme-light'>
        <div style={{ height: '88vh', display: 'flex', flexFLow: 'row nowrap' }}>
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            Preview={(previewProps) => <CustomPreviewChannel {...previewProps} />}
            showChannelSearch
          />
          {/*<Channel channel={supportChannel} message={supportMessage}>*/}
          {/*decide on the exact values later */}
          <Channel maxNumberOfFiles={10} multipleUploads={true}>
            <Window>
              {isCreating ?
                <CreateChannel toggleMobile={false} client={chatClient} /> :
                <>
                  <ChannelInner />
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </>
              }
            </Window>
            <Thread />
          </Channel>
          {/*</Channel>*/}
        </div>
      </Chat>
    </div>
  );
};


export default Messages;