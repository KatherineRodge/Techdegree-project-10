import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import '../api/app.js'

import withContext from './context.js';

import Header from './components/Header.js'
import UserSignUp from './components/UserSignUp.js'
import UserSignIn from './components/UserSignIn.js'
import Courses from './components/Courses.js'
import CourseDetail from './components/CourseDetail.js'
import CreateCourse from './components/CreateCourse.js'


const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);

export default class App extends Component {

render(){
return(
  <Router>
    <div>
      <HeaderWithContext/>
      <Route exact path="/" component={CoursesWithContext}/>
      <Route path="/sign-up" component={UserSignUpWithContext}/>
      <Route path='/sign-in' component={UserSignInWithContext}/>
      <Route path="/course/:id" component={CourseDetailWithContext}/>
      <Route path="/create-course" component={CreateCourseWithContext}/>
    </div>
  </Router>
)
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
}
}
