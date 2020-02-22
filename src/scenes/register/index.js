import React from 'react';
import { Paper, TextField, Button, IconButton } from '@material-ui/core';
import CustomSnackBar from '../../components/CustomSnackBar';
import { withRouter } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import '../login/login.css';
import { registerUser } from '../../services/authentication';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      snackbarVariant: null,
      snackbarMessage: 'test 123 test test',
      snackbarOpen: false
    };
  }

  handleRegisterError = errorCode => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Dit email adres is reeds in gebruik'
        });
      case 'auth/invalid-email':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Het email adres is geen geldig email adres'
        });
      case 'auth/operation-not-allowed':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Er is iets mis gelopen'
        });
      case 'auth/weak-password':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Gebruik een beter wachtwoord'
        });
      default:
        return;
    }
  };

  registerUser = async () => {
    const { email, password } = this.state;
    const resp = await registerUser(email, password);
    if (typeof resp === 'string') {
      this.handleRegisterError(resp);
    }
  };

  handleClickBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleValueChange = field => e => this.setState({ [field]: e.target.value });

  handleRegisterClick = () => {
    const { email, password, confirmPassword } = this.state;
    if (!email) {
      return this.setState({
        snackbarOpen: true,
        snackbarVariant: 'error',
        snackbarMessage: 'Email mag niet leeg zijn'
      });
    }
    if (!password) {
      return this.setState({
        snackbarOpen: true,

        snackbarVariant: 'error',
        snackbarMessage: 'Wachtwoord mag niet leeg zijn'
      });
    }
    if (!confirmPassword) {
      return this.setState({
        snackbarOpen: true,

        snackbarVariant: 'error',
        snackbarMessage: 'Bevestiging Wachtwoord mag niet leeg zijn'
      });
    }
    if (password !== confirmPassword) {
      return this.setState({
        snackbarOpen: true,

        snackbarVariant: 'error',
        snackbarMessage: 'Wachtwoorden moeten gelijk zijn'
      });
    }
    this.registerUser();
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      snackbarVariant,
      snackbarMessage,
      snackbarOpen
    } = this.state;
    return (
      <div className='loginContainer'>
        <Paper className='loginPaper'>
          <TextField
            className='loginTextField'
            onChange={this.handleValueChange('email')}
            value={email}
            placeholder='Email'
          />
          <TextField
            className='loginTextField'
            onChange={this.handleValueChange('password')}
            value={password}
            placeholder='Wachtwoord'
            type='password'
          />
          <TextField
            className='loginTextField'
            onChange={this.handleValueChange('confirmPassword')}
            value={confirmPassword}
            placeholder='Bevestig Wachtwoord'
            type='password'
          />
          <div className='loginButtonsContainer'>
            <IconButton onClick={this.handleClickBack} color='primary'>
              <ArrowBack />
            </IconButton>
            <Button onClick={this.handleRegisterClick} color='primary'>
              Registreren
            </Button>
          </div>
        </Paper>
        <CustomSnackBar
          open={snackbarOpen}
          onClose={() => this.setState({ snackbarOpen: false })}
          variant={snackbarVariant}
          message={snackbarMessage}
        />
      </div>
    );
  }
}

export default withRouter(index);
