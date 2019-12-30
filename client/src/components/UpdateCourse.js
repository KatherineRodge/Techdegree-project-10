import React from 'react';
import {Redirect} from 'react-router-dom'
import Form from './Form.js';

export default class UpdateCourse extends React.Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    id: '',
    courses: [],
    errors: []
  }

  async componentDidMount(){
    const {context, match} = this.props;
    let courseData = await context.data.getCourses();
    courseData = courseData.courses;
    let courseId = match.params.id;
    courseId = parseInt(courseId, 10);
    let result = courseData.find(element => (element.id === courseId));

    if (result) {
    this.setState(
      {courses: courseData,
       title: result.title,
       description: result.description,
       estimatedTime: result.estimatedTime,
       materialsNeeded: result.materialsNeeded,
       id: result.id
      }
    )} else {
      this.setState(
        {courses: courseData}
      )
    }
  }

  render(){
  const {courses} = this.state;

  let courseId = this.props.match.params.id;
  courseId = parseInt(courseId, 10);
  let result = courses.find(element => (element.id === courseId));

  const {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    errors
  } = this.state;

  const {
    authenticatedUser
  } = this.props.context;

  const userFirstName = authenticatedUser.firstName;
  const userLastName = authenticatedUser.lastName;


  if (courses.length === 0) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
  } else if (result && authenticatedUser.id !== result.userId) {
    return(<Redirect to="/forbidden"/>)
  } else if (result) {
    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                  <input
                    id="title"
                    name="title"
                    className="input-title course--title--input"
                    type="text"
                    value={title}
                    onChange={this.change}
                    placeholder="Course Title" />
                  <p>By {userFirstName} {userLastName}</p>
                  </div>
                  <div className="course--description">
                  <div>
                  <textarea
                    id="description"
                    name="description"
                    className="course--description"
                    value={description}
                    onChange={this.change}
                    placeholder="Course description..." />
                  </div>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          value={estimatedTime}
                          onChange={this.change}
                          placeholder="Hours" />
                        </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <p className="note-please">Please Hit "Enter" after each listed Item and ensure the "* " stays in front of each item to keep your list looking nice and organized!</p>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={materialsNeeded}
                          onChange={this.change}
                          onKeyUp={this.keyUp}
                          onKeyPress={this.keyPressed}
                          placeholder="List Materials" />
                        </li>
                    </ul>
                 </div>
              </div>
              </React.Fragment>
            )} />
        </div>
      </div>
)} else {
   return(<Redirect to="/notfound"/>)
}
}

//on input change set state
change = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}

//Helps with markup for the materials needed list
//http://jsfiddle.net/abhiagrawal87/m39xt/
keyPressed = (event) => {
  if (event.target.value === '') {
    event.target.value = "* "
  }
}

keyUp = (event) => {
  if (event.target.value === '') {
    event.target.value = "* "
  }

  if (event.key === "Enter") {
    event.target.value += "* ";
  }
}

//Submit handling
submit = () => {
  const { context } = this.props;
  const { authenticatedUser} = this.props.context;

  let {
    title,
    description,
    materialsNeeded,
    estimatedTime,
    id
  } = this.state;

  // Create course
  const course = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    id
  };

//Update
  context.data.updateCourse(course, authenticatedUser)
    .then( errors => {
      if (errors.length > 0) {
        this.setState({ errors });
      } else {
        this.props.history.push(`/courses/${id}`);
      }
    })
    .catch((err) => {
      this.props.history.push('/error');
    });
}

//Return back to course
  cancel = () => {
    const {id} = this.state;
    this.props.history.push(`/courses/${id}`);
  }

}
