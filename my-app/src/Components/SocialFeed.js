/*
import React from 'react';
import { StreamApp, NotificationDropdown, FlatFeed, Activity, LikeButton, StatusUpdateForm, CommentField, CommentList } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AiFillCloseCircle } from 'react-icons/ai';

function SocialFeed() {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const [showFeed, setShowFeed] = useState(true)

  return (
    showFeed ?
      <StreamApp apiKey='asnpsp7e72h6' appId='1234204' token={profile?.streamToken || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3dlZXQtbmlnaHQtMiIsImV4cCI6MTY3Nzk4ODUxMn0.QlN3o4i_5qr8MuDk5u5d-UJmaQnhcP0FzjjCn_e8xxA'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <NotificationDropdown notify style={{ color: 'white' }} />
          <IconButton onClick={() => setShowFeed(false)}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </div>
        <StatusUpdateForm style={{ opacity: '0.9', backgroundColor: 'white', color: 'black' }} />
        <FlatFeed
          feedGroup="user"
          options={{ reactions: { recent: true } }}
          notify
          Activity={(props) => (
            <Activity
              {...props}
              style={{ opacity: '0.9', backgroundColor: 'white', color: 'black' }}
              Footer={() => (
                <div style={{ padding: '8px 16px', }}>
                  <LikeButton {...props} />
                  <CommentField activity={props.activity} onAddReaction={props.onAddReaction} />
                  <CommentList activityId={props.activity.id} />
                </div>
              )}
            />
          )}
        />
      </StreamApp >
      :

      <IconButton onClick={() => setShowFeed(true)}>
        <Typography style={{ color: 'white' }}>
          Show Feed
        </Typography>
      </IconButton>

  );
}
export default SocialFeed;
*/