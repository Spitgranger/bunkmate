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
  CustomDropdown,
  useChannelStateContext,
  useChannelActionContext,
  ThreadHeader,
  Avatar,
  channelRenderFilterFn

} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './Messages.css'
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Attachment } from 'stream-chat-react';

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
        id: user?.response?.result?.email,
        name: user?.response?.result?.email,
        image: 'https://getstream.io/random_svg/?name=John',
        user_details: "GJKDJGK",
      },
      user?.response?.streamToken,
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

  const CustomDropdown = (props) => {
    const { results, focusedUser, selectResult, SearchResultItem } = props;

    let items = results.filter((x) => x.cid);
    let users = results.filter((x) => !x.cid);

    return (
      <div>
        <p>Channels</p>
        {!items.length && <p>No Channels...</p>}
        {items.map((result, index) => (
          <SearchResultItem
            focusedUser={focusedUser}
            index={index}
            key={index}
            result={result}
            selectResult={selectResult}
          />
        ))}
        <p>Users</p>
        {!users.length && <p>No Users...</p>}
        {users.map((result, index) => (
          <SearchResultItem
            focusedUser={focusedUser}
            index={index}
            key={index}
            result={result}
            selectResult={selectResult}
          />
        ))}
      </div>
    );
  };

  const isChannel = (output) => (output.cid != null);

  const CustomResultItem = (props) => {
    const { focusedUser, index, result, selectResult } = props;

    const focused = focusedUser === index;

    if (isChannel(result)) {
      const channel = result;
      const members = channel?.data?.member_count;

      return (
        <div
          className={`str-chat__channel-search-result ${focused ? 'focused' : ''}`}
          onClick={() => selectResult(result)}
        >
          <div className='result-hashtag'>#</div>
          <p className='channel-search__result-text'>{channel?.data?.name}, ({members} member{members === 1 ? '' : 's'})</p>
        </div>
      );
    } else {
      return (
        <div
          className={`str-chat__channel-search-result ${focused ? 'focused' : ''}`}
          onClick={() => selectResult(result)}
        >
          <Avatar image={result?.image} />
          {result.id}
          {result.online && <p className='user-online'> Online Now!</p>}
        </div>
      );
    }
  };

  const SearchResultsHeader = () => {
    return <div className='channel-search-header'>So many search results!</div>;
  };

  const DropDown = (props) => <CustomDropdown {...props} />;
  const SearchResult = (props) => <CustomResultItem {...props} />;

  const additionalProps = {
    DropdownContainer: DropDown,
    popupResults: true,
    searchForChannels: true,
    SearchResultsHeader: SearchResultsHeader,
    SearchResultItem: SearchResult
  };

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
      <Chat client={client}>
        <ChannelList
          filters={filters} sort={sort} options={options}
          AdditionalChannelSearchProps={additionalProps}
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
      </Chat>
    </>
  );
};

export default Messages;