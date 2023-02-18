import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import Navbar from '../Components/Navbar';
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
  LoadingIndicator,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
import './Profile.css'



//USING AS BACKUP IN CASE I FUCK UP THE MESSAGES PAGE
const filters = {
  type: 'messaging', members: {
    $in: ['apples']
  }
};
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };
const apiKey = 'asnpsp7e72h6'
const profile = JSON.parse(localStorage.getItem('profile'))

const Profile = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new StreamChat(apiKey);

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };

    newClient.on('connection.changed', handleConnectionChange);

    newClient.connectUser(
      {
        id: profile?.result?.email,
        email: profile?.result?.email,
      },
      profile?.streamToken,
    );

    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      //newClient.disconnectUser().then(() => console.log('connection closed'));
    };
  }, []);

  if (!client) return <LoadingIndicator />;

  return (
    <Chat client={client} >
      <SignInProvider>
        <Navbar />
      </SignInProvider>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default Profile;