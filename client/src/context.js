import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './data.js';

const Context = React.createContext();


export class Provider extends Component {

  state = {
    courses: [],
    prevPath: null,
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  }

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const {courses, authenticatedUser, prevPath} = this.state;
    const value = {
      courses,
      authenticatedUser,
      prevPath,
      data: this.data,
      actions: {
        signIn : this.signIn,
        signOut: this.signOut,
        prevPath: this.setPrevRoute
      }
    };

      return (
        <Context.Provider value={value}>
          {this.props.children}
        </Context.Provider>
      );
  }

//Saves previous path when sign in link is clicked in order to bring user back to that page once sign in is succesful
 setPrevRoute = () => {
   this.setState({prevPath: window.location.pathname})
 }


//Sign in functionality
  signIn = async (emailAddress, password) => {
    let originalPassword = password;
    let user = await Data.prototype.getUser(emailAddress, password);



    if (user) {
      user = user[0];
      user.password = originalPassword;

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


//Sign out functionality
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
        {context => <Component {...props} context={context}/>}
      </Context.Consumer>
    );
  }
}
