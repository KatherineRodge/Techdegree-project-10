import config from './config.js';

export default class Data {

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    let options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth === true) {
      let encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}

    async getCourses() {
      const response = await this.api(`/courses`, 'GET');
      if (response.status === 200) {
        return response.json().then(data => data)
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
      }

      async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
      }

      async createCourse(course, user) {
        const response = await this.api('/courses', 'POST', course, true, user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
      }

      async deleteCourse(match, user){
      let id = match.params.id;
      const response = await this.api(`/courses/${id}`, 'DELETE', match, true, user);
      if (response.status === 204) {
        return [];
      } else {
        throw new Error();
      }
      }

}
