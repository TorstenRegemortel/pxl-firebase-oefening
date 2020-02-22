import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Fab
} from '@material-ui/core';
import { Add as AddIcon, PowerSettingsNew } from '@material-ui/icons';
import { signOut } from '../../services/authentication';
import './header.css';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isRooms = () => {
    const { history } = this.props;
    const path = history.location.pathname;
    return path === '/app/rooms';
  };

  resolveTitle = () => {
    const { history } = this.props;
    const path = history.location.pathname;
    switch (path) {
      case '/app/rooms':
        return 'ROOMS';
      default:
        return 'CHAT';
    }
  };

  render() {
    const { user, onClickRoomAdd } = this.props;
    return (
      <AppBar position='fixed'>
        <Toolbar
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div className='menuContainer'>
            <IconButton onClick={() => signOut()}>
              <PowerSettingsNew style={{ color: 'white' }} />
            </IconButton>
            <Typography variant='h6' style={{ color: 'white' }}>
              {this.resolveTitle()}
            </Typography>
          </div>

          {!!user && this.isRooms() && (
            <Fab
              onClick={onClickRoomAdd}
              color='secondary'
              aria-label='Add'
              className='roomsAddButton'
            >
              <AddIcon />
            </Fab>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(index);
