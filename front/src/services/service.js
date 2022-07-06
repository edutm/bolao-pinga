import axios from 'axios';


//const loginDto = JSON.parse(localStorage.getItem('loginDto'));
const api = axios.create({
  ///baseURL: 'http://localhost:8080/api/',
  //baseURL: 'http://192.168.15.41:8080/api/',
  baseURL: 'https://bolao-pinga-dev.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    //Authorization : loginDto ? `Bearer ${loginDto.token}` : ''
  }
});

export { api };