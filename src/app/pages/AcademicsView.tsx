import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '../../context/SimpleAuthContext';
import BasicButton from '../../components/BasicButton';

export default function AcademicsView() {
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
          <h1 style={{ margin: 0, fontSize: '20px' }}>Academics</h1>
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
            Academic Information
          </h2>
          
          {/* Academic Stats */}
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
              <h3 style={{ marginTop: 0, color: '#388e3c' }}>Current Semester</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>1st</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Batch 2025</p>
            </div>

            <div style={{
              backgroundColor: '#f3e5f5',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#7b1fa2' }}>Courses</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>6</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>This Semester</p>
            </div>
          </div>

          {/* Academic Details */}
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Academic Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>Department:</strong> Computer Science
              </div>
              <div>
                <strong>Program:</strong> Bachelor of Technology
              </div>
              <div>
                <strong>Batch:</strong> 2025
              </div>
              <div>
                <strong>Academic Year:</strong> 2024-2025
              </div>
              <div>
                <strong>Enrollment Status:</strong> <span style={{ color: 'green' }}>Active</span>
              </div>
              <div>
                <strong>Attendance:</strong> 85%
              </div>
            </div>
          </div>

          {/* Admin Only Actions */}
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
                  onClick={() => alert('Update CGPA feature coming soon!')}
                  style={{ backgroundColor: '#ffc107', color: '#000' }}
                >
                  Update CGPA
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Manage courses feature coming soon!')}
                  style={{ backgroundColor: '#ffc107', color: '#000' }}
                >
                  Manage Courses
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Update attendance feature coming soon!')}
                  style={{ backgroundColor: '#ffc107', color: '#000' }}
                >
                  Update Attendance
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
                Your academic information is in view-only mode. Contact your administrator if you need to make any changes.
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
