import axios from "axios";

const api = axios.create({
     baseURL: process.env.NODE_ENV === 'production'
          ? 'https://voting-application-mern.vercel.app/api/v1'
          : 'http://localhost:8000/api/v1',
});

export default api;