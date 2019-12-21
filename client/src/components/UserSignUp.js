import React from 'react';
import {Link} from 'react-router-dom';
import Form from './Form.js'

export default class UserSignUp extends React.Component {
    state = {
      firstName: '',
      lastName:'',
      emailAddress: '',
      password: '',
      errors: [],
    }

    render() {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        errors,
      } = this.state;

      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={this.change}
                    placeholder="First Name" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={this.change}
                    placeholder="Last Name" />
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
              Already have a user account? <Link to="/sign-in">Click here</Link> to sign in!
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
      const {
        name,
        username,
        password,
      } = this.state;

      // Create user
      const user = {
        name,
        username,
        password,
      };

      context.data.createUser(user)
        .then( errors => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            context.actions.signIn(username, password)
              .then(() => {
                this.props.history.push('/authenticated');
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.history.push('/error');
        });

    }

    cancel = () => {
     this.props.history.push('/');
    }
  }
