import React from 'react';
import {Link} from 'react-router-dom';

export default class Courses extends React.Component {

state = {
  courses: []
}

async componentDidMount(){
  const {context} = this.props;
  try {
  let courseData = await context.data.getCourses();
  courseData = courseData.courses;
  this.setState({courses: courseData})
} catch (error) {
  throw new Error; 
}
}

//Displays all Courses currently in database
render() {
const {courses} = this.state;
const courseList = courses.map((course, index) =>
  <div className="grid-33" key={index}><Link className="course--module course--link" to={`/courses/${course.id}`}>
    <h4 className="course--label">{index+1}</h4>
    <h3 className="course--title">{course.title}</h3>
    </Link>
  </div>
); return (
    <div className="bounds">
      {courseList}
      <div className="grid-33"><a className="course--module course--add--module" href="/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </a></div>
    </div>
)}}
