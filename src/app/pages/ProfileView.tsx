import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '../../context/SimpleAuthContext';
import BasicButton from '../../components/BasicButton';

export default function ProfileView() {
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
          <h1 style={{ margin: 0, fontSize: '20px' }}>My Profile</h1>
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
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
            Profile Information
          </h2>
          
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Personal Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>Full Name:</strong> {user?.name || 'N/A'}
              </div>
              <div>
                <strong>Email Address:</strong> {user?.email || 'N/A'}
              </div>
              <div>
                <strong>User Role:</strong> {user?.role || 'N/A'}
              </div>
              <div>
                <strong>Account Status:</strong> <span style={{ color: 'green' }}>Active</span>
              </div>
              <div>
                <strong>Member Since:</strong> {new Date().toLocaleDateString()}
              </div>
              <div>
                <strong>Last Login:</strong> {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Admin Only Edit Section */}
          {user?.role === 'admin' && (
            <div style={{
              backgroundColor: '#fff3cd',
              padding: '20px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #ffeaa7'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#856404' }}>
                Admin Actions
              </h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <BasicButton 
                  onClick={() => alert('Edit profile feature coming soon!')}
                  style={{ backgroundColor: '#ffc107', color: '#000' }}
                >
                  Edit Profile
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Delete account feature coming soon!')}
                  style={{ backgroundColor: '#dc3545' }}
                >
                  Delete Account
                </BasicButton>
              </div>
            </div>
          )}

          {/* Student View Only Message */}
          {user?.role !== 'admin' && (
            <div style={{
              backgroundColor: '#d1ecf1',
              padding: '20px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #bee5eb'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#0c5460' }}>
                View Only Mode
              </h3>
              <p style={{ margin: 0, color: '#0c5460' }}>
                Your profile is in view-only mode. Contact your administrator if you need to make any changes to your information.
              </p>
            </div>
          )}

          {/* Back Button */}
          <div style={{ textAlign: 'center' }}>
            <BasicButton 
              onClick={() => navigate('/student')}
              style={{ backgroundColor: '#6c757d' }}
            >
              Back to Dashboard
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
