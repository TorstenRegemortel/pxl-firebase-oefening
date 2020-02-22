import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

export default class index extends React.Component {
  state = {
    chat: {
      title: '',
      description: ''
    },
    images: []
  };

  handleValueChange = field => event => {
    const val = event.target.value;
    this.setState(({ chat }) => ({
      chat: {
        ...chat,
        [field]: val
      }
    }));
  };

  handleChangeImages = images => this.setState({ images });

  handleSave = () => {
    const { chat, images } = this.state;
    const { onSave } = this.props;
    onSave(chat, images);
    this.handleClose();
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({
      chat: {
        title: '',
        description: ''
      },
      images: []
    });
    onClose();
  };

  render() {
    const { open } = this.props;
    const { chat } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Nieuwe chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Maak hier een nieuwe chat aan, enkel jij kan deze verwijderen of
            aanpassen.
          </DialogContentText>
          <DropzoneArea
            acceptedFiles={['image/*']}
            filesLimit={1}
            dropzoneText='Upload een foto voor de chat.'
            onChange={files => this.handleChangeImages(files)}
            showAlerts={false}
          />
          <TextField
            value={chat.title}
            autoFocus
            margin='dense'
            id='Title'
            label='Titel'
            fullWidth
            onChange={this.handleValueChange('title')}
          />
          <TextField
            value={chat.description}
            autoFocus
            margin='dense'
            id='description'
            label='Beschrijving'
            fullWidth
            onChange={this.handleValueChange('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary'>
            Annuleren
          </Button>
          <Button onClick={this.handleSave} color='primary'>
            Opslaan
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
