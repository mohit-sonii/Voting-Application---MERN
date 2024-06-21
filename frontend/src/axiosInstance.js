import axios from "axios";

const api = axios.create({
     baseURL: process.env.NODE_ENV === 'production'
          ? 'https://voting-application-mern.vercel.app/'
          : 'http://localhost:8000/',
});

export default api;