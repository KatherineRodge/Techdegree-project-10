import React, { Component } from 'react';
//import Cookies from 'js-cookie';
import Data from './data.js';

const Context = React.createContext();


export class Provider extends Component {

  state = {
    courses: []
  }

  constructor() {
    super();
    this.data = new Data();
  }

  async componentDidMount() {
    let courseData = await Data.prototype.getCourses();
    courseData = courseData.courses;
    this.setState({courses: courseData})
  }

  render() {
    const {courses} = this.state;
    const value = {
      courses,
      data: this.data
    };

      return (
        <Context.Provider value={value}>
          {this.props.children}
        </Context.Provider>
      );
  }

  //
  //
  // signIn = async (username, password) => {
  //   const user = await this.data.getUser(username, password);
  //   if (user !== null) {
  //     this.setState(() => {
  //       return {
  //         authenticatedUser: user,
  //       };
  //     });
  //     const cookieOptions = {
  //       expires: 1 // 1 day
  //     };
  //     Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
  //   }
  //   return user;
  // }
  //
  // signOut = () => {
  //   this.setState({ authenticatedUser: null });
  //   Cookies.remove('authenticatedUser');
  // }
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
