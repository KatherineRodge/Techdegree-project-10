//Shows individual course data, plus delete and update
import React from 'react'

export default class CourseDetail extends React.Component {

render(){
const {courses} = this.props.context;
let courseId = this.props.match.params.id;
courseId = parseInt(courseId, 10);

if (courses.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
} else {
  const result = courses.find(element => (element.id === courseId));
  console.log(result);
  let time = result.estimatedTime;
  let materialsNeeded = result.materialsNeeded;
  let estimatedTime = {};
  let materialList = {};

//check to see if time has a value
function checkTime() {
   if (time) {
    console.log(true);
      estimatedTime = <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <h3>{result.estimatedTime}</h3>
                          </li>
      console.log({estimatedTime});
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
    console.log(materialsNeeded);
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

const requiredInformation =   <div className="grid-66">
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
          <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
              className="button button-secondary" href="/">Return to List</a></div>
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
)}}
}
