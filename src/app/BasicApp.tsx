import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SimpleAuthProvider } from '../context/SimpleAuthContext';
import BasicLoginPage from './pages/BasicLoginPage';
import BasicRegisterPage from './pages/BasicRegisterPage';
import SimpleStudentDashboard from './pages/SimpleStudentDashboard';
import ProfileView from './pages/ProfileView';
import AcademicsView from './pages/AcademicsView';
import FeesView from './pages/FeesView';

// Basic Admin Dashboard
const BasicAdminDashboard = () => {
  const { logout } = require('../context/SimpleAuthContext').useSimpleAuth();
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px' }}>Admin Dashboard</h1>
          <p style={{ margin: 0, fontSize: '12px' }}>Management System</p>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            color: '#dc3545',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
            Admin Dashboard
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#d4edda',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#155724' }}>Total Students</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>156</p>
            </div>

            <div style={{
              backgroundColor: '#d1ecf1',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#0c5460' }}>Active Users</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>142</p>
            </div>

            <div style={{
              backgroundColor: '#f8d7da',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#721c24' }}>New Registrations</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>12</p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '4px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Recent Activity
            </h3>
            <p style={{ color: '#666' }}>Admin functionality is ready for implementation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<BasicLoginPage />} />
      <Route path="/register" element={<BasicRegisterPage />} />
      
      {/* Student routes */}
      <Route path="/student" element={<SimpleStudentDashboard />} />
      <Route path="/student/dashboard" element={<SimpleStudentDashboard />} />
      <Route path="/student/profile" element={<ProfileView />} />
      <Route path="/student/academics" element={<AcademicsView />} />
      <Route path="/student/fees" element={<FeesView />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<BasicAdminDashboard />} />
      <Route path="/admin/dashboard" element={<BasicAdminDashboard />} />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function BasicApp() {
  return (
    <SimpleAuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </SimpleAuthProvider>
  );
}

export default BasicApp;
