import { useState, useEffect } from 'react'
import { StreamChat } from 'stream-chat';

export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);
  const profile = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (profile) {

      const client = new StreamChat(apiKey);
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client?.connectUser(userData, tokenOrProvider).then(() => {
        if (!didUserConnectInterrupt) setChatClient(client);
      });


      return () => {
        didUserConnectInterrupt = true;
        setChatClient(null);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => client.disconnectUser())
          .then(() => {
            console.log('connection closed');
          });
      };

    }
  }, [apiKey, userData?.id, tokenOrProvider]);

  return chatClient;
};