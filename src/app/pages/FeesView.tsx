import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '../../context/SimpleAuthContext';
import BasicButton from '../../components/BasicButton';

export default function FeesView() {
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
          <h1 style={{ margin: 0, fontSize: '20px' }}>Fees Information</h1>
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
            Fees Details
          </h2>
          
          {/* Fees Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#388e3c' }}>Total Fees</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>₹45,000</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Academic Year</p>
            </div>

            <div style={{
              backgroundColor: '#fff3cd',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#856404' }}>Fees Paid</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>₹0</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>0% Paid</p>
            </div>

            <div style={{
              backgroundColor: '#f8d7da',
              padding: '20px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, color: '#721c24' }}>Remaining</h3>
              <p style={{ fontSize: '24px', margin: '5px 0', color: '#333' }}>₹45,000</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Due Soon</p>
            </div>
          </div>

          {/* Fees Details */}
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Fee Breakdown
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>Tuition Fees:</strong> ₹35,000
              </div>
              <div>
                <strong>Library Fees:</strong> ₹2,000
              </div>
              <div>
                <strong>Lab Fees:</strong> ₹3,000
              </div>
              <div>
                <strong>Examination Fees:</strong> ₹2,000
              </div>
              <div>
                <strong>Other Fees:</strong> ₹3,000
              </div>
              <div>
                <strong>Total:</strong> ₹45,000
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Payment Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>Last Payment:</strong> No payments yet
              </div>
              <div>
                <strong>Next Due Date:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </div>
              <div>
                <strong>Payment Method:</strong> Online/Offline
              </div>
              <div>
                <strong>Status:</strong> <span style={{ color: 'orange' }}>Pending</span>
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
                  onClick={() => alert('Record payment feature coming soon!')}
                  style={{ backgroundColor: '#28a745' }}
                >
                  Record Payment
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Update fees feature coming soon!')}
                  style={{ backgroundColor: '#ffc107', color: '#000' }}
                >
                  Update Fees
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Generate receipt feature coming soon!')}
                  style={{ backgroundColor: '#17a2b8' }}
                >
                  Generate Receipt
                </BasicButton>
                <BasicButton 
                  onClick={() => alert('Send reminder feature coming soon!')}
                  style={{ backgroundColor: '#fd7e14' }}
                >
                  Send Reminder
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
                Payment Information
              </h3>
              <p style={{ margin: 0, color: '#0c5460', marginBottom: '10px' }}>
                Your fees information is in view-only mode. Please contact the administration office for payment-related queries.
              </p>
              <div style={{ 
                backgroundColor: '#fff3cd', 
                padding: '10px', 
                borderRadius: '4px',
                marginTop: '10px'
              }}>
                <strong>Important:</strong> Please pay your fees before the due date to avoid late fees.
              </div>
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
