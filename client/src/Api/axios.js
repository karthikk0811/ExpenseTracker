import axios from "axios";
const URL='http://localhost:8000';
// const URL='https://expensetracker-86ec.onrender.com/';

export default axios.create({
    baseURL:URL,
    withCredentials:true
})

export const axiosPrivate=axios.create({
    baseURL:URL,
    withCredentials:true
})