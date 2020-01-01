import React from 'react';
import { Link } from 'react-router-dom';


export default ({context}) => {

    const authUser = context.authenticatedUser;

     return(
      <div className="header">
        <div className="bounds">
          <h1 className='header--logo'>Courses</h1>
          <nav>
            {authUser !== null ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" onClick={context.actions.prevPath} to='/signin'>Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    )

}
