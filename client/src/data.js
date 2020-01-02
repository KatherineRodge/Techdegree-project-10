import config from './config.js';

export default class Data {

//Fetches API from localhost:5000 as defined in the config File
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

//sets Headers
    let options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

//if body is required
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

//if authorized user is required
    if (requiresAuth === true) {
      let encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

//Error handling if server fetch failed
//https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
  return fetch(url, options)
    .then( response => {
    if (!response.ok) { throw response }
    return response  //no error present
  }).catch( err => {
    return err
  });
}



//Fetched course List
    async getCourses() {
      const response = await this.api(`/courses`, 'GET');
      if (response.status === 200) {
        return response.json().then(data => data)
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        window.location.pathname = '/error'
      }
    }

//Fetches Currently Auth User
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          window.location.pathname = '/error'
        }
      }

//Creates new user
      async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data;
          });
        }
        else {
          window.location.pathname = '/error'
        }
      }

//Creates new Course
      async createCourse(course, user) {
        const response = await this.api('/courses', 'POST', course, true, user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data;
          });
        }
        else {
          window.location.pathname = '/error'
        }
      }

//Deletes Course
      async deleteCourse(match, user){
      let id = match.params.id;
      const response = await this.api(`/courses/${id}`, 'DELETE', match, true, user);
      if (response.status === 204) {
        return [];
      } else {
        window.location.pathname = '/error'
      }
      }

//Updates and Saves Course
      async updateCourse(course, user){
        let id = course.id;
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, user);
        if (response.status === 204) {
          return [];
        } else if (response.status === 400) {
          return response.json().then(data => {
            return data;
          })
        } else {
          window.location.pathname = '/error'
        }
      }
}
