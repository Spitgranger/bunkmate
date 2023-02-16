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
  Avatar,
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
  id: profile?.response?.result?.email,
  name: profile?.response?.result?.email,
  image: 'https://getstream.io/random_png/?id=summer-rain-2&name=summer-rain-2',
};


//this code filters for channels the user is a part of 
const filters = { type: 'messaging', members: { $in: [profile ? profile.response.result.email : null] } };
const sort = { last_message_at: -1 };
const options = { state: true, presence: true, limit: 10 };


const Messages = () => {

  const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });
  const [supportChannel, setSupportChannel] = useState(null)
  const [supportMessage, setSupportMessage] = useState(null)
  /*
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
  
  
    }, [chatClent])
  
    */

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
  if (!chatClient) return (<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><LoadingIndicator size={50} /></div>)


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





  return (
    <>
      <SignInProvider>
        <Navbar />
      </SignInProvider>
      <Chat client={chatClient} theme='str-chat__theme-light'>
        <div style={{ height: '100%', display: 'flex', flexFLow: 'row nowrap' }}>
          <ChannelList
            filters={filters} sort={sort} options={options}
            showChannelSearch
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
    </>
  );
};


export default Messages;
