import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SymptomChecker from './pages/SymptomChecker';
import AppointmentBooking from './pages/AppointmentBooking';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MedicalRecords from './pages/MedicalRecords';
import FamilyRecords from './pages/FamilyRecords';
import Telemedicine from './pages/Telemedicine';
import HealthMetrics from './pages/HealthMetrics';
import Medications from './pages/Medications';
import LandingPage from './pages/LandingPage';
import MedicalKnowledge from './pages/MedicalKnowledge';
import SettingsPage from './pages/SettingsPage';
import AdminDoctorManagement from './pages/AdminDoctorManagement';
import AuditLogs from './pages/AuditLogs';
import HelpAndFirstAid from './pages/HelpAndFirstAid';
import DoctorPatients from './pages/DoctorPatients';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorConsultation from './pages/DoctorConsultation';
import DoctorPrescriptions from './pages/DoctorPrescriptions';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const DashboardRoutes = () => {
  const { user } = useAuth();
  
  if (user?.role === 'ROLE_PATIENT') {
    return (
      <Routes>
        <Route index element={<PatientDashboard />} />
        <Route path="appointments" element={<AppointmentBooking />} />
        <Route path="records" element={<MedicalRecords />} />
        <Route path="medications" element={<Medications />} />
        <Route path="family" element={<FamilyRecords />} />
        <Route path="telemedicine" element={<Telemedicine />} />
        <Route path="knowledge" element={<MedicalKnowledge />} />
        <Route path="analytics" element={<HealthMetrics />} />
        <Route path="symptoms" element={<SymptomChecker />} />
        <Route path="help" element={<HelpAndFirstAid />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    );
  }
  
  if (user?.role === 'ROLE_DOCTOR') {
    return (
      <Routes>
        <Route index element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="consult" element={<DoctorConsultation />} />
        <Route path="prescriptions" element={<DoctorPrescriptions />} />
        <Route path="help" element={<HelpAndFirstAid />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    );
  }
  
  if (user?.role === 'ROLE_ADMIN') {
    return (
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="manage-doctors" element={<AdminDoctorManagement />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    );
  }

  return <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
