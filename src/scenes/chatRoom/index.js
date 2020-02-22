import React from 'react';
import { TextField, IconButton, Divider } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import {
  sendMessage,
  listenOnChat,
  readNext,
  removeListener
} from '../../services/chat';

const mockData = [
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '12344' },
  { message: 'test 1234', senderId: '12343' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '12344' },
  { message: 'test 1234', senderId: '12343' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '12344' },
  { message: 'test 1234', senderId: '12343' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '12344' },
  { message: 'test 1234', senderId: '12343' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'test 1234', senderId: '12344' },
  { message: 'test 1234', senderId: '12343' },
  { message: 'test 1234', senderId: '1234' },
  { message: 'blablabla', senderId: '1234' }
];

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
    this.scroller = null;
    this.chatListener = null;
    this.canLoad = true;
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props;
    this.chatListener = listenOnChat(params.roomId, snap => {
      this.setState(
        ({ messages }) => ({
          messages: [...messages, { id: snap.key, ...snap.val() }]
        }),
        () => {
          if (this.scroller) {
            this.scroller.scrollTop = this.scroller.scrollHeight;
          }
        }
      );
    });
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
      this.listenOnScroll();
    }
  };

  componentWillUnmount = () => {
    if (this.chatListener) {
      const {
        match: { params }
      } = this.props;
      removeListener(params.roomId, this.chatListener);
    }
  };

  listenOnScroll = () => {
    this.scroller.addEventListener('scroll', async e => {
      const { messages } = this.state;
      if (e.target.scrollTop < 50 && messages.length >= 100 && this.canLoad) {
        const {
          match: { params }
        } = this.props;
        this.canLoad = false;
        const data = await readNext(params.roomId, messages[0].id);
        data.pop();
        this.setState(
          ({ messages }) => ({
            messages: [...data, ...messages]
          }),
          () => {
            if (data.length >= 99) {
              this.canLoad = true;
            }
          }
        );
      }
    });
  };

  handleChange = e => this.setState({ message: e.target.value });

  handleSend = async () => {
    const { message } = this.state;
    const {
      match: { params },
      user
    } = this.props;
    if (message) {
      await sendMessage(
        params.roomId,
        message,
        user.uid,
        user.displayName || 'Anonymous'
      );
    }
    this.setState({ message: '' });
  };

  render() {
    const { message, messages } = this.state;
    const { user } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          marginTop: '100px',
          padding: '25px',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <TextField
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.handleSend();
              }
            }}
            onChange={this.handleChange}
            value={message}
            style={{ width: '70%' }}
            placeholder='Type hier...'
          />
          <IconButton onClick={this.handleSend}>
            <SendIcon />
          </IconButton>
        </div>
        <Divider />
        <div
          ref={ref => (this.scroller = ref)}
          style={{ overflow: 'scroll', scrollBehavior: 'revert' }}
        >
          {messages.map(d => (
            <ChatMessage
              key={d.id}
              message={d.message}
              isSender={d.senderId === user.uid}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(index);
