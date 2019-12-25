import React, {Component} from 'react';
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
      <PrivateRoute path="/authenticated" Redirect="/"/>
      <Route path="/sign-up" component={UserSignUpWithContext}/>
      <Route path='/sign-in' component={UserSignInWithContext}/>
      <Route path='/sign-out' component={UserSignOutWithContext}/>
      <Route exact path="/course/:id" component={CourseDetailWithContext}/>
      <Route path="/course/:id/update-course" component={UpdateCourseWithContext}/>
      <Route path="/create-course" component={CreateCourseWithContext}/>
      <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
)}
}
