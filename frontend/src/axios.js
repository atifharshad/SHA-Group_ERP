import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const instance = axios.create({
    baseURL: 'http://localhost:8000',
});
// const instance = axios.create({
//         baseURL: 'https://8bcb-43-247-157-185.in.ngrok.io',
//     });
// const instance = axios.create({
//         baseURL: 'http://18.236.118.187',
//     }); 
// const instance = axios.create({
//     baseURL: ' https://2f1c-43-247-157-185.in.ngrok.io',
// });
export default instance;