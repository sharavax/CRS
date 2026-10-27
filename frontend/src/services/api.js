import axios from 'axios';

// Base API configuration (uses proxy in dev or full URL fallback)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiService = {
  // Course APIs
  async getCourses() {
    const response = await apiClient.get('/courses');
    return response.data;
  },

  async addCourse(courseData) {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },

  // Registration APIs
  async getRegistrations() {
    const response = await apiClient.get('/registrations');
    return response.data;
  },

  async registerStudent(registrationData) {
    const response = await apiClient.post('/registrations', registrationData);
    return response.data;
  },

  async cancelRegistration(id) {
    const response = await apiClient.delete(`/registrations/${id}`);
    return response.data;
  },

  // Statistics API
  async getStats() {
    const response = await apiClient.get('/stats');
    return response.data;
  },
};

export default apiService;
