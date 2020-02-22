import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Rooms from './scenes/rooms';
import ChatRoom from './scenes/chatRoom';
import './App.css';

class App extends Component {
  state = {
    createRoomOpen: false
  };

  handleRoomAddClick = () =>
    this.setState({
      createRoomOpen: true
    });

  handleClose = () => this.setState({ createRoomOpen: false });

  render() {
    const { user } = this.props;
    const { createRoomOpen } = this.state;
    return (
      <div className='App'>
        <Header onClickRoomAdd={this.handleRoomAddClick} user={user} />
        <Switch>
          <Route
            exact
            path='/app/rooms'
            component={props => (
              <Rooms
                {...props}
                user={user}
                createRoomOpen={createRoomOpen}
                onCloseCreateRoom={this.handleClose}
              />
            )}
          />
          <Route
            exact
            path='/app/rooms/:roomId'
            component={props => <ChatRoom {...props} user={user} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
