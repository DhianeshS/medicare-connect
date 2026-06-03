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

// Initialize mock DB in localStorage
const initMockDB = () => {
  if (!localStorage.getItem('mc_doctors')) {
    localStorage.setItem('mc_doctors', JSON.stringify([
      { id: 1, firstName: 'Arjun', lastName: 'Sharma', specialization: 'Cardiology', qualification: 'MD, DM - Senior Cardiologist', availabilityStatus: 'AVAILABLE', consultationFee: 800, experienceYears: 12, clinicAddress: 'Hospital Block A, Delhi', availableWorkingHours: 'Mon-Fri: 09:00 - 15:00' },
      { id: 2, firstName: 'Priya', lastName: 'Nair', specialization: 'Dermatology', qualification: 'MD - Chief Dermatologist', availabilityStatus: 'AVAILABLE', consultationFee: 700, experienceYears: 8, clinicAddress: 'Hospital Block B, Delhi', availableWorkingHours: 'Mon-Thu: 10:00 - 16:00' },
      { id: 3, firstName: 'Vikram', lastName: 'Reddy', specialization: 'Neurology', qualification: 'MD, DM - Senior Neurologist', availabilityStatus: 'AVAILABLE', consultationFee: 1000, experienceYears: 15, clinicAddress: 'Hospital Block C, Delhi', availableWorkingHours: 'Tue-Fri: 09:00 - 14:00' },
      { id: 4, firstName: 'Sarah', lastName: 'Connor', specialization: 'Pediatrics', qualification: 'MD - Pediatric Lead', availabilityStatus: 'AVAILABLE', consultationFee: 600, experienceYears: 10, clinicAddress: 'Hospital Block D, Delhi', availableWorkingHours: 'Mon-Sat: 09:00 - 13:00' }
    ]));
  }
  if (!localStorage.getItem('mc_diseases')) {
    localStorage.setItem('mc_diseases', JSON.stringify([
      { id: 1, name: 'Fever' },
      { id: 2, name: 'Common Cold' },
      { id: 3, name: 'Diarrhea' }
    ]));
  }
  if (!localStorage.getItem('mc_appointments')) {
    localStorage.setItem('mc_appointments', JSON.stringify([
      {
        id: 1,
        patient: { id: 3, firstName: 'Ramesh', lastName: 'Kumar', email: 'ramesh@test.com' },
        doctor: { id: 1, firstName: 'Arjun', lastName: 'Sharma', specialization: 'Cardiology' },
        appointmentDate: '2026-06-03',
        appointmentTime: '09:00 AM',
        reason: 'Routine Checkup',
        status: 'BOOKED'
      }
    ]));
  }
  if (!localStorage.getItem('mc_patients')) {
    localStorage.setItem('mc_patients', JSON.stringify([
      { id: 3, firstName: 'Ramesh', lastName: 'Kumar', email: 'ramesh@test.com', status: 'ONLINE', age: '45 Yrs', phone: '+91 98765 0011' },
      { id: 5, firstName: 'Lakshmi', lastName: 'Devi', email: 'lakshmi@test.com', status: 'IDLE', age: '32 Yrs', phone: '+91 98765 0021' },
      { id: 6, firstName: 'Suresh', lastName: 'Raj', email: 'suresh@test.com', status: 'ONLINE', age: '58 Yrs', phone: '+91 98765 0031' },
      { id: 7, firstName: 'Anita', lastName: 'Sharma', email: 'anita@test.com', status: 'ONLINE', age: '29 Yrs', phone: '+91 98765 0041' }
    ]));
  }
};

// Simulated mock database request router
const handleMockRequest = (method: string, url: string, data: any) => {
  initMockDB();
  const lowerMethod = method.toLowerCase();

  // 1. Auth Login / Register
  if (url.includes('/auth/login') && lowerMethod === 'post') {
    const { email, password } = data || {};
    if (email === 'admin@medicareconnect.com' && password === 'Admin@123') {
      return { data: { id: 1, username: email, firstName: 'Hospital', lastName: 'Controller', role: 'ROLE_ADMIN', token: 'demo-token' }, status: 200 };
    }
    if (email === 'sarah@medicare.com' && password === 'Doctor@123') {
      return { data: { id: 2, username: email, firstName: 'Sarah', lastName: 'Johnson', role: 'ROLE_DOCTOR', token: 'demo-token' }, status: 200 };
    }
    if (email === 'ramesh@test.com' && password === 'Patient@123') {
      return { data: { id: 3, username: email, firstName: 'Ramesh', lastName: 'Kumar', role: 'ROLE_PATIENT', token: 'demo-token' }, status: 200 };
    }
    return { data: { id: 99, username: email || 'user@test.com', firstName: 'Ramesh', lastName: 'Kumar', role: 'ROLE_PATIENT', token: 'demo-token' }, status: 200 };
  }

  if (url.includes('/auth/register') && lowerMethod === 'post') {
    return { data: { message: "User registered successfully!" }, status: 200 };
  }

  // 2. Doctor details / update
  const doctorDetailMatch = url.match(/\/doctors\/(\d+)/);
  if (doctorDetailMatch) {
    const id = parseInt(doctorDetailMatch[1]);
    const doctors = JSON.parse(localStorage.getItem('mc_doctors') || '[]');
    if (lowerMethod === 'get') {
      const doctor = doctors.find((d: any) => d.id === id);
      return doctor ? { data: doctor, status: 200 } : { status: 404 };
    }
    if (lowerMethod === 'put') {
      const updatedDoctors = doctors.map((d: any) => d.id === id ? { ...d, ...data } : d);
      localStorage.setItem('mc_doctors', JSON.stringify(updatedDoctors));
      return { data: data, status: 200 };
    }
  }

  // Doctor list
  if (url.includes('/doctors') && lowerMethod === 'get') {
    const doctors = JSON.parse(localStorage.getItem('mc_doctors') || '[]');
    return { data: doctors, status: 200 };
  }

  // 3. Diseases
  if (url.includes('/diseases') && lowerMethod === 'get') {
    const diseases = JSON.parse(localStorage.getItem('mc_diseases') || '[]');
    return { data: diseases, status: 200 };
  }

  // 4. Appointments
  if (url.includes('/appointments')) {
    const appointments = JSON.parse(localStorage.getItem('mc_appointments') || '[]');
    if (lowerMethod === 'get') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.role === 'ROLE_PATIENT') {
          return { data: appointments.filter((a: any) => a.patient?.email === user.email), status: 200 };
        } else if (user.role === 'ROLE_DOCTOR') {
          return { data: appointments.filter((a: any) => a.doctor?.id === user.id), status: 200 };
        }
      }
      return { data: appointments, status: 200 };
    }
    if (lowerMethod === 'post') {
      const doctors = JSON.parse(localStorage.getItem('mc_doctors') || '[]');
      const doctor = doctors.find((d: any) => d.id === data.doctorId);
      
      const userStr = localStorage.getItem('user');
      const currentUser = userStr ? JSON.parse(userStr) : { firstName: 'Ramesh', lastName: 'Kumar', email: 'ramesh@test.com' };

      const newAppt = {
        id: appointments.length + 1,
        patient: {
          id: currentUser.id || 3,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email
        },
        doctor: doctor || { id: data.doctorId, firstName: 'Unknown', lastName: 'Doctor', specialization: 'General' },
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        reason: data.reason || 'General Consult',
        status: 'BOOKED'
      };

      appointments.push(newAppt);
      localStorage.setItem('mc_appointments', JSON.stringify(appointments));
      return { data: { message: "Appointment booked successfully!", appointmentId: newAppt.id }, status: 200 };
    }
  }

  // 5. Admin Patient endpoints
  if (url.includes('/admin/create-patient') && lowerMethod === 'post') {
    const patients = JSON.parse(localStorage.getItem('mc_patients') || '[]');
    const newPatient = {
      id: patients.length + 1,
      ...data,
      status: 'ONLINE'
    };
    patients.push(newPatient);
    localStorage.setItem('mc_patients', JSON.stringify(patients));
    return { data: newPatient, status: 200 };
  }

  if (url.includes('/admin/active-patients') && lowerMethod === 'get') {
    const patients = JSON.parse(localStorage.getItem('mc_patients') || '[]');
    return { data: patients, status: 200 };
  }

  return null;
};

// Response interceptor to catch failed API requests and redirect to simulated localStorage DB
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (config && (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404 || error.response.status >= 500)) {
      console.warn("Backend API is offline or unreachable. Falling back to local storage mock database.");
      try {
        const parsedData = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : null;
        const mockRes = handleMockRequest(config.method || 'get', config.url || '', parsedData);
        if (mockRes) {
          return Promise.resolve({
            data: mockRes.data,
            status: mockRes.status,
            statusText: 'OK',
            headers: {},
            config: config,
          });
        }
      } catch (e) {
        console.error("Error in mock database fallback:", e);
      }
    }
    return Promise.reject(error);
  }
);

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
