import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header.js'
import NotFound from './components/NotFound.js';
import UserSignUp from './components/UserSignUp.js'
import UserSignIn from './components/UserSignIn.js'
import UserSignOut from './components/UserSignOut.js'
import Courses from './components/Courses.js'
import CourseDetail from './components/CourseDetail.js'
import UpdateCourse from './components/UpdateCourse.js'
import CreateCourse from './components/CreateCourse.js'
import Forbidden from './components/Forbidden.js'
import UnhandledError from "./components/UnhandledError.js"

import withContext from './context.js';
import PrivateRoute from './PrivateRoutes.js';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

export default class App extends Component {

render(){



return(
  <Router>
    <div>
      <HeaderWithContext/>

      <Switch>
      <Route exact path="/" component={CoursesWithContext}/>
      <Route path="/signup" component={UserSignUpWithContext}/>
      <Route path='/signin' component={UserSignInWithContext}/>
      <Route path='/signout' component={UserSignOutWithContext}/>
      <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
      <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
      <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
      <Route path="/forbidden" component={Forbidden}/>
      <Route path="/error" component={UnhandledError} />
      <Route path='/notfound' component={NotFound} />
      <Redirect from="*" to="/notfound" />
      </Switch>
    </div>
  </Router>
)}
}
