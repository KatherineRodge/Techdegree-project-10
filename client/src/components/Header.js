import React from 'react';
import { Link } from 'react-router-dom';


export default class Header extends React.PureComponent {

  render () {
    const authUser = this.props.context.authenticatedUser;

     return(
      <div className="header">
        <div className="bounds">
          <h1 className='header--logo'>Courses</h1>
          <nav>
            {authUser !== null ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                <Link to="/sign-out">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/sign-up">Sign Up</Link>
                <Link className="signin" to="/sign-in">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    )
}
}
