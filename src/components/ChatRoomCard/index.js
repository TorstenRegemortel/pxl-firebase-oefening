import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton
} from '@material-ui/core';
import { Chat as ChatIcon, Delete as DeleteIcon } from '@material-ui/icons';

const defaultImage =
  'http://www.jaipuriaschoolballia.in/wp-content/uploads/2016/11/blank-img.jpg';

const index = ({ chat, onClickChat, onClickDelete }) => (
  <Card
    style={{
      flex: 1,
      maxWidth: '300px',
      display: 'inline-block',
      margin: '8px'
    }}
  >
    <CardActionArea onClick={onClickChat}>
      <CardMedia
        component='img'
        src={chat.image && chat.image.url ? chat.image.url : defaultImage}
        height={150}
        title='Chat Image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {chat.title}
        </Typography>
        <Typography component='p'>{chat.description}</Typography>
      </CardContent>
    </CardActionArea>
    <CardActions
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <Button onClick={onClickChat} size='small' color='primary'>
        <ChatIcon style={{ marginRight: '8px' }} />
        Join Chat
      </Button>
      <IconButton onClick={onClickDelete}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default index;
