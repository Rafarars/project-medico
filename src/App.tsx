import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorPatientsPage from './pages/doctor/DoctorPatientsPage';
import AppointmentsPage from './pages/doctor/AppointmentsPage';
import TreatmentsPage from './pages/doctor/TreatmentsPage';
import MessagesPage from './pages/doctor/MessagesPage';
import ReportsPage from './pages/doctor/ReportsPage';
import DoctorSettingsPage from './pages/doctor/SettingsPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointmentsPage from './pages/patient/AppointmentsPage';
import PatientTreatmentsPage from './pages/patient/TreatmentsPage';
import PatientMessagesPage from './pages/patient/MessagesPage';
import ProfilePage from './pages/patient/ProfilePage';
import PatientSettingsPage from './pages/patient/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Layouts
import DoctorLayout from './layouts/DoctorLayout';
import PatientLayout from './layouts/PatientLayout';

// Protected route components
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Doctor routes */}
      <Route path="/doctor" element={
        <ProtectedRoute requiredRole="doctor">
          <DoctorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatientsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="treatments" element={<TreatmentsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<DoctorSettingsPage />} />
      </Route>
      
      {/* Patient routes */}
      <Route path="/patient" element={
        <ProtectedRoute requiredRole="patient">
          <PatientLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointmentsPage />} />
        <Route path="treatments" element={<PatientTreatmentsPage />} />
        <Route path="messages" element={<PatientMessagesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<PatientSettingsPage />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;