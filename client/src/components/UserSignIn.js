import React from 'react';
import Form from './Form.js'
import {Link} from 'react-router-dom'

export default class UserSignIn extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }


  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };;
    const { emailAddress, password } = this.state;

    //check to see if input has values before continuing
    if(!emailAddress && !password) {
      this.setState(() => {
        return { errors: 'Both Password And Email Address Fields Must Have A Valid Value to Continue' };
      })
    } else if(!emailAddress) {
      this.setState(() => {
        return { errors:  'Email Address Must Have A Valid Value to Continue' };
      })
    } else if(!password) {
      this.setState(() => {
        return { errors:  'Password Must Have A Valid Value to Continue' };
      })
    } else {
    context.actions.signIn(emailAddress, password)
    .then((user) => {
      if (user === null) {
        this.setState(() => {
          return { errors: 'Sign-in was unsuccessful, Please Try To Enter Your Sign In Information Again'  };
        });
      } else {
        this.props.history.push(from.pathname);
      }
   }).catch((error) => {
      this.props.history.push('/error');
    });
  }}

  cancel = () => {
    this.props.history.push('/');
  }
}
