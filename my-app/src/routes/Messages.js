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
        id: 'john',
        name: 'John',
        image: 'https://getstream.io/random_svg/?name=John',
        user_details: "GJKDJGK",
      },
      newClient.devToken("john")
    );
    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      // newClient.disconnectUser().then(() => console.log('connection closed'));
    };
  }, []);

  if (!client) return null;

  const channel = client.channel('messaging', {
    image: 'dave.png',
    name: 'Create a Messaging Channel',
    members: ['john', 'trey-anastasio'],
    // option to add custom fields
  });

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