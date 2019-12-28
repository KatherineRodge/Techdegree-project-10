//Shows individual course data, plus delete and update
import React from 'react'
import {Redirect} from 'react-router-dom';

export default class CourseDetail extends React.Component {
state = {
  courses: [],
  authorizedUser: this.props.context.authenticatedUser
}

//Sets state to all Courses Available
async componentDidMount(){
  const {context} = this.props;
  let courseData = await context.data.getCourses();
  courseData = courseData.courses;
  this.setState({courses: courseData})
}

//Finds course that matchs id
render(){
const {courses} = this.state;
const {authorizedUser} = this.state;
let courseId = this.props.match.params.id;
courseId = parseInt(courseId, 10);
const result = courses.find(element => (element.id === courseId));

//waits for courses to result a value
if (courses.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
} else if(result){

  let time = result.estimatedTime;
  let materialsNeeded = result.materialsNeeded;
  let estimatedTime = {};
  let materialList = {};
  let updateButtons = null;

//check to see a user is signed in and if that user owns this course
function checkUser(e){
  if(authorizedUser && (authorizedUser.id === result.userId)){
    updateButtons =
      <span><a className="button" href={courseId + "/update-course"}>Update Course</a>
      <button className="button" onClick={e}>Delete Course</button></span>
      return updateButtons;
  }
}


//check to see if time has a value
function checkTime() {
   if (time) {
      estimatedTime = <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <h3>{result.estimatedTime}</h3>
                          </li>
      return estimatedTime;
  } else {
      estimatedTime = null;
      return estimatedTime;
  }
}

//check to see if Materials have a value
function checkMaterials() {
  if(materialsNeeded) {
    materialsNeeded = materialsNeeded.split("* ");
    materialsNeeded.shift();
    const materialListItems = materialsNeeded.map((material, index) =>
      <li key={index}>{material}</li>
    );
    materialList =
        <li className="course--stats--list--item">
          <h4>Materials Needed</h4>
          <ul>
            {materialListItems}
          </ul>
        </li>
    return materialList;
  } else {
    materialList = null;
    return materialList;
  }
}

checkTime();
checkMaterials();
checkUser(this.delete);

//Renders Course Description / Title as those are required
const requiredInformation =
   <div className="grid-66">
      <div className="course--header">
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{result.title}</h3>
        <p>By: {result.User.firstName} {result.User.lastName}</p>
      </div>
      <div className="course--description">
        <p>{result.description}</p>
      </div>
    </div>;

  return(
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
          {updateButtons}
          <a className="button button-secondary" href="/">Return to List</a></div>
        </div>
      </div>
      {requiredInformation}
      <div className="bounds course--detail">
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              {estimatedTime}
              {materialList}
            </ul>
          </div>
        </div>
      </div>
    </div>
)} else {
   return (<Redirect to="/notFound" />)
}

}
//delete course functionality
  delete = () => {
    const { match, context } = this.props;
    const { authenticatedUser} = this.props.context;

    context.data.deleteCourse(match, authenticatedUser)
      .then( errors => {
        if (errors.length > 0) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        this.props.history.push('/error');
      });
    }
  }
