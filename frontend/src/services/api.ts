import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include JWT token
api.interceptors.request.use((config) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export const authService = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const doctorService = {
  getDoctors: () => api.get('/doctors'),
  getDoctor: (id: number) => api.get(`/doctors/${id}`),
  updateDoctor: (id: number, data: any) => api.put(`/doctors/${id}`, data),
};

export const appointmentService = {
  getAppointments: () => api.get('/appointments'),
  bookAppointment: (data: any) => api.post('/appointments', data),
};
export const diseaseService = {
  getDiseases: () => api.get('/diseases'),
};
export const adminService = {
  createPatient: (patientData: any) => api.post('/admin/create-patient', patientData),
  getActivePatients: () => api.get('/admin/active-patients'),
};

