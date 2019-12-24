import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './data.js';

const Context = React.createContext();


export class Provider extends Component {

  state = {
    courses: [],
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const {courses, authenticatedUser} = this.state;
    const value = {
      courses,
      authenticatedUser,
      data: this.data,
      actions: {
        signIn : this.signIn,
        signOut: this.signOut
      }
    };

      return (
        <Context.Provider value={value}>
          {this.props.children}
        </Context.Provider>
      );
  }


  signIn = async (emailAddress, password) => {
    let originalPassword = password;
    let user = await Data.prototype.getUser(emailAddress, password);
    user = user[0];
    user.password = originalPassword;
    console.log(user);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', user, cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
