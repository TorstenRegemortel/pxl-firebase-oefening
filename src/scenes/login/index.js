import React from 'react';
import { Paper, TextField, Button, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CustomSnackBar from '../../components/CustomSnackBar';
import { signInAnonimously, signInUser } from '../../services/authentication';
import './login.css';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      snackbarMessage: '',
      snackbarOpen: false,
      snackbarVariant: ''
    };
  }

  handleSignInError = errorCode => {
    switch (errorCode) {
      case 'auth/user-disabled':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Er is geen gebruiker gevonden met dit email adres'
        });
      case 'auth/invalid-email':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Het email adres is geen geldig email adres'
        });
      case 'auth/user-not-found':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Er is geen gebruiker gevonden met dit email adres'
        });
      case 'auth/wrong-password':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Wachtwoord is niet correct'
        });
      case 'auth/operation-not-allowed':
        return this.setState({
          snackbarOpen: true,
          snackbarVariant: 'error',
          snackbarMessage: 'Er is iets mis gelopen'
        });
      default:
        return;
    }
  };

  handleValueChange = field => e => this.setState({ [field]: e.target.value });

  handleRegisterClick = () => {
    const { history } = this.props;
    history.push('/register');
  };

  handleLoginClick = async () => {
    const { email, password } = this.state;
    if (!email) {
      return this.setState({
        snackbarOpen: true,
        snackbarVariant: 'error',
        snackbarMessage: 'Email adres moet ingevuld zijn'
      });
    }
    if (!password) {
      return this.setState({
        snackbarOpen: true,
        snackbarVariant: 'error',
        snackbarMessage: 'Wachtwoord moet ingevuld zijn'
      });
    }
    const resp = await signInUser(email, password);
    if (typeof resp === 'string') {
      this.handleSignInError(resp);
    }
  };

  handleAnonimousSignIn = async () => {
    const resp = await signInAnonimously();
    if (typeof resp === 'string') {
      this.handleSignInError(resp);
    }
  };

  render() {
    const {
      email,
      password,
      snackbarMessage,
      snackbarOpen,
      snackbarVariant
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
          <div className='loginButtonsContainer'>
            <Button onClick={this.handleRegisterClick} color='primary'>
              Registreren
            </Button>
            <Button onClick={this.handleLoginClick} color='primary'>
              Aanmelden
            </Button>
          </div>
          <Link
            component='button'
            variant='body2'
            onClick={this.handleAnonimousSignIn}
          >
            Aanmelden als gast
          </Link>
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
