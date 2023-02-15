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
} from 'stream-chat-react';
import Navbar from '../Components/Navbar';
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import { useClient } from './hooks/useClient';
import './Messages.css'
import 'stream-chat-react/dist/css/v2/index.css';
import { experimentalStyled } from '@mui/material';



const profile = JSON.parse(localStorage.getItem('profile'))
console.log(profile)
const apiKey = 'asnpsp7e72h6'
//streamToken
const userToken = profile?.response?.streamToken;



const user = {
  id: profile?.response?.result?.email,
  name: profile?.response?.result?.email,
  image: 'https://getstream.io/random_png/?id=summer-rain-2&name=summer-rain-2',
};



const filters = { type: 'messaging', members: { $in: ['summer-rain-2'] } };
const sort = { last_message_at: -1 };
const options = { state: true, presence: true, limit: 10 };


const App = () => {

  const chatClient = useClient({ apiKey: apiKey, userData: user, tokenOrProvider: userToken });

  if (!user) {
    return (
      <>
        <Navbar />
        <h1>YOU NEED TO BE LOGGED IN TO MESSAGE</h1>
      </>
    )
  }

  if (!chatClient) return (<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><LoadingIndicator size={50} /></div>
  );

  //displays message when user edits a message
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
          <Channel >
            <ChannelInner />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </div>
      </Chat>
    </>
  );
};


export default App;
