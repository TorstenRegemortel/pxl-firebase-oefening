import React from 'react';
import { Typography } from '@material-ui/core';

const ChatMessage = ({ message, isSender }) => (
  <div
    style={{
      padding: '8px',
      maxWidth: '70%',
      marginLeft: isSender ? '30%' : '0px',
      marginTop: '4px',
      marginBottom: '4px',
      backgroundColor: isSender ? '#57b4d4' : 'lightgrey',
      borderRadius: '10px'
    }}
  >
    <Typography style={{ textAlign: isSender ? 'right' : 'left' }}>
      {message}
    </Typography>
  </div>
);

export default ChatMessage;
