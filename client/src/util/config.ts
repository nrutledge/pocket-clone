import dotenv from 'dotenv';
dotenv.config();

export default {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000'
}