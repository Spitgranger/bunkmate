import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  VirtualizedMessageList,
  useMessageContext,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
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
import Navbar from '../Components/Navbar';
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import { useClient } from './hooks/useClient';
import './Messages.css';

import support from '../Components/Assets/support.jpg'
import { IoMdMore } from 'react-icons/io'
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import IconButton from '@mui/material/IconButton';
import { IoIosExit } from 'react-icons/io'
import { Navigate } from 'react-router';
import 'stream-chat-react/dist/css/v2/index.css';




const Messages = () => {

  const profile = JSON.parse(localStorage.getItem('profile'));
  const apiKey = process.env.REACT_APP_STREAM_API_KEY;
  const hasShownMessage = localStorage.getItem('hasShownMessage')

  //Initialize a new support user
  const supportToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNmM2Q2N2I2MWM5YTNkMjU0NjIxMTQwIn0._hwRRwzLK4OvwgJxptajqQQMYoFmYjvhtg5Z_vtK6Wo'
  const supportUser = {
    id: "63f3d67b61c9a3d254621140",
    name: "Support Team",
    image: 'https://picsum.photos/200'
  };
  const supportClient = useClient({ apiKey: apiKey, userData: supportUser, tokenOrProvider: supportToken });

  //Initialize a regular user 
  const userToken = profile?.streamToken;
  const user = {
    id: profile?.result?._id,
    name: profile?.result?.name,
    image: 'https://picsum.photos/200',
  };
  const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });


  //Creating a custom support channel
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


  if (!profile) {
    return (
      <>
        <SignInProvider>
          <Navbar />
        </SignInProvider>
        <h1>YOU NEED TO BE LOGGED IN TO MESSAGE</h1>
      </>
    )
  }
  if (!chatClient) return (<div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} ><LoadingIndicator size={50} />
  </div >)

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



  const CustomPreviewChannel = (props) => {
    //manages state for time since last message
    const [timeLastMessage, setTimeLastMessage] = useState("");

    const { watchers, active, channel, displayTitle, unread, lastMessage, setActiveChannel } = props

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
      console.log(displayTitle)
      await channel.update(
        {
          name: displayTitle
        },
        {
          text: `${profile.result.name} has left the group`
        },);
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
          <div style={{ borderRadius: '50%', backgroundColor: 'red', color: 'white', minWidth: '15px', }}>
            <h5 style={{ padding: '1px', margin: '2px', fontWeight: '800' }} >
              {'99+'}
            </h5>
          </div >
          :
          <div style={{ borderRadius: '50%', backgroundColor: 'red', color: 'white', minWidth: '15px' }}>
            <h5 style={{ margin: '2px', fontWeight: '800' }} >
              {unread}
            </h5>
          </div>
      ));
    }
    //display the last message sent in the preview
    const displayLastMessageUser = (profile, lastMessage) => {
      if (lastMessage === undefined) {
        return ("")
      } else {
        return (profile?.result?.name === lastMessage.user.name ? 'You: ' : "")
      }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };



    return (
      <>
        <button style={active ? { backgroundColor: 'white' } : null} className="channelPreview" onClick={() => (setActiveChannel(channel, watchers))} >
          <div style={{ padding: '5px' }}>
            <Avatar name={displayTitle} />
          </div>
          {/* Mainly controls for the size of the last message prevew*/}
          <div style={{ width: '50%' }}>
            <div style={{ fontWeight: 'bold', padding: '5px', width: '100%', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-start' }}>
              {displayTitle}
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
          <div style={{ padding: '5px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
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
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} >
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

  return (
    <div
      className="messages"
    >
      <SignInProvider>
        <Navbar />
      </SignInProvider>
      <Chat client={chatClient} theme='str-chat__theme-light'>
        <div style={{ height: '100%', display: 'flex', flexFLow: 'row nowrap' }}>
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            Preview={(previewProps) => CustomPreviewChannel({ ...previewProps })}
            showChannelSearch
          /*onChannelUpdated={() => { }}*/
          />
          {/*<Channel channel={supportChannel} message={supportMessage}>*/}
          {/*decide on the exact values later */}
          <Channel maxNumberOfFiles={10} multipleUploads={true}>
            <Window >
              <ChannelInner />
              <ChannelHeader />
              <MessageList />
              <MessageInput />
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