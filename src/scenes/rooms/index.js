import React from 'react';
import { withRouter } from 'react-router-dom';
import ChatRoomCard from '../../components/ChatRoomCard';
import { CircularProgress, Typography } from '@material-ui/core';
import {
  loadRooms,
  addRoom,
  updateRoom,
  deleteRoom
} from '../../services/rooms';
import { resolveFirestoreError } from '../../services/firebase';
import { uploadFile } from '../../services/storage';
import RoomDialog from '../../components/RoomDialog';
import CustomSnackbar from '../../components/CustomSnackBar';

const mockData = [
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  },
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  },
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  },
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  },
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  },
  {
    image: {
      url:
        'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
    },
    title: 'this is the title of a chat',
    description:
      'A simple description of the chat room, not too long, not too short.'
  }
];

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      error: false,
      errorMessage: '',
      snackbarOpen: false,
      snackbarVariant: 'success',
      snackbarMessage: ''
    };
  }

  componentDidMount = async () => {
    console.log('mount');
    const rooms = await loadRooms();
    if (typeof rooms === 'string') {
      this.setState({
        error: true,
        errorMessage: resolveFirestoreError(rooms),
        loading: false
      });
    } else {
      this.setState({
        loading: false,
        data: rooms
      });
    }
  };

  handleSaveChat = async (chat, images) => {
    const { user } = this.props;
    const room = await addRoom({
      ...chat,
      createdBy: user.uid,
      createdOn: new Date().getTime(),
      lastMessageOn: new Date().getTime(),
      lastMessage: ''
    });
    console.log('room', room);
    if (typeof room === 'string') {
      console.error(room);
    } else {
      if (images.length > 0) {
        console.log('images');
        const image = await uploadFile(images[0], `rooms/${room.id}/image`);
        const updated = await updateRoom(room.id, { image }, room.data);
        if (typeof updated === 'string') {
          console.log('error', updated);
          console.error(updated);
        } else {
          console.log('updated', updated);
          this.setState(({ data }) => ({
            data: [...data, updated]
          }));
        }
      } else {
        console.log('in else of images');
        this.setState(({ data }) => ({
          data: [...data, room]
        }));
      }
    }
  };

  handleClickChat = id => () => {
    const { history } = this.props;
    history.push(`/app/rooms/${id}`);
  };

  handleClickDelete = roomId => async () => {
    const success = await deleteRoom(roomId);
    if (success) {
      this.setState(({ data }) => ({
        data: data.filter(d => d.id !== roomId),
        snackbarOpen: true,
        snackbarMessage: 'Room deleted successfully',
        snackbarVariant: 'success'
      }));
    } else {
      this.setState(({ data }) => ({
        snackbarOpen: true,
        snackbarMessage: 'Something went wrong deleting the room',
        snackbarVariant: 'error'
      }));
    }
  };

  renderContent() {
    const { loading, data, error, errorMessage } = this.state;
    if (loading) {
      return <CircularProgress className='loader' />;
    }
    if (error) {
      return (
        <Typography className='noData' variant='h4' style={{ color: 'red' }}>
          {errorMessage}
        </Typography>
      );
    }
    if (data.length === 0) {
      return (
        <Typography className='noData' variant='h4'>
          There are no rooms yet
        </Typography>
      );
    }
    return (
      <div
        style={{
          position: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '100px',
          padding: '25px',
          flexWrap: 'wrap'
        }}
      >
        {data.map(c => (
          <ChatRoomCard
            onClickChat={this.handleClickChat(c.id)}
            key={c.id}
            chat={c.data}
            onClickDelete={this.handleClickDelete(c.id)}
          />
        ))}
      </div>
    );
  }

  render() {
    const { createRoomOpen, onCloseCreateRoom } = this.props;
    const { snackbarOpen, snackbarVariant, snackbarMessage } = this.state;
    return (
      <React.Fragment>
        {this.renderContent()}
        <RoomDialog
          open={createRoomOpen}
          onSave={this.handleSaveChat}
          onClose={onCloseCreateRoom}
        />
        <CustomSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          variant={snackbarVariant}
          onClose={() => this.setState({ snackbarOpen: false })}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(index);
