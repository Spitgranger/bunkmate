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
  DateSeparator
} from 'stream-chat-react';
import Navbar from '../Components/Navbar';
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import { useClient } from './hooks/useClient';
import './Messages.css'
import 'stream-chat-react/dist/css/v2/index.css';
import support from '../Components/Assets/support.jpg'

const profile = JSON.parse(localStorage.getItem('profile'))
const apiKey = 'asnpsp7e72h6'
//streamToken
const userToken = profile?.response?.streamToken;


const user = {
  id: profile?.response?.result?._id,
  name: profile?.response?.result?.name,
  image: 'https://getstream.io/random_png/?id=summer-rain-2&name=summer-rain-2',
};



//this code filters for channels the user is a part of 
const filters = { type: 'messaging', members: { $in: [profile ? profile.response.result._id : null] } };
const sort = { last_message_at: -1 };
const options = { state: true, presence: true, limit: 10 };

const Messages = () => {

  const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });
  const [supportChannel, setSupportChannel] = useState(null)
  const [supportMessage, setSupportMessage] = useState(null)

  //Creating a custom support channel
  useEffect(() => {

    if (chatClient) {

      const channel = chatClient.channel('messaging', 'support-channel', {
        name: "Support Team",
        image: 'https://t4.ftcdn.net/jpg/01/36/75/37/360_F_136753727_wNMYxIesFtm7ecMeMehDu5yYCtLOAxCx.jpg',
        members: ["vegas", "apples"],
        session: 8,
      });

      setSupportChannel(channel);


      const message = channel.sendMessage({
        text: 'How can we help you today?'
      });

      setSupportMessage(message);

    }


  }, [chatClient])


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
  if (!chatClient) return (<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} > <LoadingIndicator size={50} /></div >)


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

  console.log(useChannelDeletedListener)

  const CustomPreviewChannel = (props) => {

    const { channel, displayTitle, unread } = props

    /*console.log('print avatar', props.Avatar(props).props.className)*/
    console.log(props)
    //calculates the last time the message was sent
    const dateString = channel.data.last_message_at
    const date = new Date(dateString);
    const now = new Date();

    const millisecondsDifference = now.getTime() - date.getTime(); //milliseconds
    const secondsDifference = Math.round(millisecondsDifference / 1000); //seconds
    const minutesDifference = Math.round(millisecondsDifference / 60000); //minutes
    const hoursDifference = Math.round(millisecondsDifference / 3600000); //hours
    const daysDifference = Math.round(millisecondsDifference / 86400000); //days
    const timeValues = { millisecondsDifference, secondsDifference, minutesDifference, hoursDifference, daysDifference }

    const timeDisplay = (timeValues) => {
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

    return (
      <>
        <button className="channelPreview">
          <Avatar name={displayTitle} />
          {displayTitle}
          {timeDisplay(timeValues)}
          {unread}
        </button>
      </>
    )
  }

  return (
    <div className="messages">
      <SignInProvider>
        <Navbar />
      </SignInProvider>
      <Chat client={chatClient} theme='str-chat__theme-light'>
        <div style={{ height: '100%', display: 'flex', flexFLow: 'row nowrap' }}>
          <ChannelList
            filters={filters} sort={sort} options={options}
            Preview={(previewProps) => CustomPreviewChannel({ ...previewProps })}
            showChannelSearch
            onChannelDeleted
          />
          {/*<Channel channel={supportChannel} message={supportMessage}>*/}
          <Channel>
            <ChannelInner />
            <Window>
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
