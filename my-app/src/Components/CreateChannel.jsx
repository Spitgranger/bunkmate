import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import _debounce from 'lodash.debounce';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import './CreateChannel.css';

//each user profile that shows up after a query
const UserResult = ({ user }) => {
  return (
    <li className='messaging-create-channel__user-result'>
      <Avatar image={user.image} name={user.name || user.id} size={40} />
      <div className="messaging-create-channel__user-result__name">
        {user.name}
      </div>
      {user.online && <div className='messaging-create-channel__user-result-online' />}
      <div className='messaging-create-channel__user-result__details'>
        <span>{user.name}</span>
        {/* <span className='messaging-create-channel__user-result__details__last-seen'>{user.online}</span> */}
      </div>
    </li>
  )

};

const CreateChannel = ({ toggleMobile, client }) => {

  const { setActiveChannel } = useChatContext();
  const [focusedUser, setFocusedUser] = useState(undefined);
  const [inputText, setInputText] = useState('');
  const [resultsOpen, setResultsOpen] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const inputRef = useRef();

  const clearState = () => {
    setInputText('');
    setResultsOpen(false);
    setSearchEmpty(false);
  };

  useEffect(() => {
    const clickListener = () => {
      if (resultsOpen) clearState();
    };

    document.addEventListener('click', clickListener);

    return () => document.removeEventListener('click', clickListener);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const findUsers = async () => {
    if (searching) return;
    setSearching(true);

    try {
      const response = await client.queryUsers(
        {
          id: { $ne: client.userID },
          $and: [{ name: { $autocomplete: inputText } }],
        },
        { id: 1 },
        //Number of users you want to appear in the search bar
        { limit: 10 },
      );

      if (!response.users.length) {
        setSearchEmpty(true);
      } else {
        setSearchEmpty(false);
        setUsers(response.users);
      }

      setResultsOpen(true);
    } catch (error) {
      console.log({ error });
    }

    setSearching(false);
  };

  const findUsersDebounce = _debounce(findUsers, 100, {
    trailing: true,
  });

  useEffect(() => {
    if (inputText) {
      findUsersDebounce();
    }

  }, [inputText]); // eslint-disable-line react-hooks/exhaustive-deps

  const createChannel = async () => {
    const selectedUsersIds = selectedUsers.map((u) => u.id);
    const formattedSelectedUsersNames = selectedUsers.map((u) => `${u.name}, `);
    //used in the special case where there is only one roomate you've selected
    const selectedUsersNames = selectedUsers.map((u) => u.name);


    //if no roomates selected return nothing
    if (!selectedUsersIds.length) return;

    //if 1 other roomate return that other person's name
    else if (selectedUsersIds.length === 1) {
      const conversation = client.channel('messaging', {
        name: [...selectedUsersNames],
        members: [...selectedUsersIds, client.userID]
      })

      await conversation.watch();
      setActiveChannel(conversation);
    }

    else {
      const conversation = client.channel('messaging', {

        name: [...formattedSelectedUsersNames, client.user.name],
        members: [...selectedUsersIds, client.userID],
      });

      await conversation.watch();
      setActiveChannel(conversation);
    }

    setSelectedUsers([]);
    setUsers([]);
  };

  const addUser = (u) => {
    const isAlreadyAdded = selectedUsers.find((user) => user.id === u.id);
    if (isAlreadyAdded) return;

    setSelectedUsers([...selectedUsers, u]);
    setResultsOpen(false);
    setInputText('');
    inputRef.current.focus();
  };

  const removeUser = (user) => {
    const newUsers = selectedUsers.filter((item) => item.id !== user.id);
    setSelectedUsers(newUsers);
    inputRef.current.focus();
  };

  const handleKeyDown = useCallback(
    (e) => {
      // check for up(38) or down(40) key
      if (e.which === 38) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === 0 ? users.length - 1 : prevFocused - 1;
        });
      }
      if (e.which === 40) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0;
          return prevFocused === users.length - 1 ? 0 : prevFocused + 1;
        });
      }
      if (e.which === 13) {
        e.preventDefault();
        if (focusedUser !== undefined) {
          addUser(users[focusedUser]);
          return setFocusedUser(undefined);
        }
      }
    },
    [users, focusedUser], // eslint-disable-line
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className='messaging-create-channel'>
      <header style={{ padding: '10px' }}>
        <div className='messaging-create-channel__left'>
          <div className='users-input-container'>
            {!!selectedUsers?.length && (
              <div className='messaging-create-channel__users'>
                {selectedUsers.map((user) => (
                  <div
                    className='messaging-create-channel__user'
                    onClick={() => removeUser(user)}
                    key={user.id}
                  >
                    <div className='messaging-create-channel__user-text'>{user.name}</div>
                    <RemoveCircleIcon />
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={addUser}>
              <input
                autoFocus
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={!selectedUsers.length ? 'Start typing to find bunkmates :' : ''}
                type='text'
                className='messaging-create-channel__input'
                style={{ fontSize: '15px' }}
              />
            </form>
          </div>
          <div className='close-mobile-create' onClick={() => toggleMobile()}>
            {/* Button Background*/}
            <div style={{ width: '300px', height: '300px' }}></div>
          </div>
        </div>
        <button className='create-channel-button' onClick={createChannel}>
          Start chat
        </button>
      </header>
      {inputText && (
        <main>
          <ul className='messaging-create-channel__user-results'>
            {!!users?.length && !searchEmpty && (
              <div className='messaging-create-channel__user-results__container'>
                {users.map((user, i) => (
                  <div
                    className={`messaging-create-channel__user-result ${focusedUser === i && 'focused'
                      }`}
                    onClick={() => addUser(user)}
                    key={user.id}
                  >
                    <UserResult user={user} />
                  </div>
                ))}
              </div>
            )}
            {searchEmpty && (
              <div
                onClick={() => {
                  inputRef.current.focus();
                  clearState();
                }}
                className='messaging-create-channel__user-result empty'
              >
                No people found...
              </div>
            )}
          </ul>
        </main>
      )}
    </div>
  );
};

export default React.memo(CreateChannel);