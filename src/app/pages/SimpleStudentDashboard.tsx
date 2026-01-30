import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '../../context/SimpleAuthContext';
import BasicButton from '../../components/BasicButton';

export default function SimpleStudentDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useSimpleAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: user?.role === 'admin' ? '#dc3545' : '#007bff',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px' }}>
            {user?.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
          </h1>
          <p style={{ margin: 0, fontSize: '12px' }}>
            Welcome, {user?.name || 'User'} ({user?.role || 'student'})
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '14px' }}>{user?.email}</span>
          <BasicButton onClick={handleLogout}>Logout</BasicButton>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
            Welcome to Your Dashboard
          </h2>
          
          {/* User Information */}
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              User Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>Name:</strong> {user?.name || 'N/A'}
              </div>
              <div>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </div>
              <div>
                <strong>Role:</strong> {user?.role || 'N/A'}
              </div>
              <div>
                <strong>Status:</strong> <span style={{ color: 'green' }}>Active</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#e3f2fd',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#1976d2' }}>Current CGPA</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>0.0</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Out of 4.0</p>
            </div>

            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#388e3c' }}>Fees Paid</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>₹0</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>of ₹45,000</p>
            </div>

            <div style={{
              backgroundColor: '#f3e5f5',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#7b1fa2' }}>Semester</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>1st</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Batch 2025</p>
            </div>
          </div>

          {/* Action Buttons - Admin Only */}
          {user?.role === 'admin' ? (
            <div style={{ textAlign: 'center' }}>
              <BasicButton 
                onClick={() => alert('Edit Profile feature coming soon!')}
                style={{ marginRight: '10px' }}
              >
                Edit Profile
              </BasicButton>
              <BasicButton 
                onClick={() => alert('Manage Students feature coming soon!')}
                style={{ backgroundColor: '#28a745' }}
              >
                Manage Students
              </BasicButton>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <p style={{ color: '#666', margin: 0 }}>View Only Mode - Contact Admin for Changes</p>
            </div>
          )}
        </div>

        {/* Simple Navigation Menu */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
            Navigation
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <BasicButton 
              onClick={() => navigate('/student/profile')}
              style={{ backgroundColor: '#6c757d' }}
            >
              My Profile
            </BasicButton>
            <BasicButton 
              onClick={() => navigate('/student/academics')}
              style={{ backgroundColor: '#6c757d' }}
            >
              Academics
            </BasicButton>
            <BasicButton 
              onClick={() => navigate('/student/fees')}
              style={{ backgroundColor: '#6c757d' }}
            >
              Fees
            </BasicButton>
            {user?.role === 'admin' && (
              <BasicButton 
                onClick={() => alert('Admin Settings coming soon!')}
                style={{ backgroundColor: '#dc3545' }}
              >
                Admin Settings
              </BasicButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
