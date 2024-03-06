import axios from 'axios';

// const token = localStorage.getItem('accesstoken');
export default axios.create({
  baseURL: 'https://datajet-production.up.railway.app/api',
  // baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
});
