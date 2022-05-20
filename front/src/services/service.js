import axios from 'axios';


const loginDto = JSON.parse(localStorage.getItem('loginDto'));
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization : loginDto ? `Bearer ${loginDto.token}` : ''
  }
});

export { api };