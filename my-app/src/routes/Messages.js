import Navbar from '../Components/Navbar';
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

// Define values.
const api_key = 'asnpsp7e72h6'
const api_secret = 'djzm2aq63636qg2mjeqx9x5422hb4qu78pqepyf7fx7j7fuu44zwdgathr24zeyu'
const user_id = 'john'
// Initialize a Server Client

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };
const user = JSON.parse(localStorage.getItem("profile"));
const Messages = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new StreamChat('asnpsp7e72h6');

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };

    newClient.on('connection.changed', handleConnectionChange)
    newClient.connectUser(
      {
        id: user.response.result.email,
        name: user.response.result.email,
        image: 'https://getstream.io/random_svg/?name=John',
        user_details: "GJKDJGK",
      },
      user.response.streamToken,
    );
    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      // newClient.disconnectUser().then(() => console.log('connection closed'));
    };
  }, []);
  if (!user) {
    return (
      <>
        <Navbar />
        <h1>YOU NEED TO BE LOGGED IN TO MESSAGE</h1>
      </>
    )
  }
  if (!client) return null;

  return (
    <>
      <Navbar />
      <Chat client={client}>
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
    </>
  );
};

export default Messages;