import axios from 'axios';


const user = JSON.parse(localStorage.getItem('user'));
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization : user ? `Bearer ${user.data.token}` : ''
  }
});

export { api };