import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Login from './scenes/login';
import Register from './scenes/register';
import App from './App';
import { onAuthStateChanged } from './services/authentication';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

class Router extends React.Component {
  state = {
    user: null
  };

  authListener;

  componentDidMount = () => {
    const { history } = this.props;
    this.authListener = onAuthStateChanged(user =>
      this.setState({ user }, () => {
        const { user } = this.state;
        if (user) {
          history.push('/app/rooms');
        }
      })
    );
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute
          path='/app'
          component={props => <App {...props} user={user} />}
          authenticated={!!user}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Router);
