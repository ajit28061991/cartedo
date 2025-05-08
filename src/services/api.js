import axios from 'axios';

const BASE_URI = 'https://cartedo-mock-api-d9672364e747.herokuapp.com';

export const getCourses = () => axios.get(`${BASE_URI}/api/courses`);
export const addCourse = (courseData) => axios.post(`${BASE_URI}/api/courses`, courseData);
