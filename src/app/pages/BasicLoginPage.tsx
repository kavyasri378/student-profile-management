import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSimpleAuth } from '../../context/SimpleAuthContext';
import BasicButton from '../../components/BasicButton';
import BasicInput from '../../components/BasicInput';

export default function BasicLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useSimpleAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success && result.user) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '24px',
          color: '#333'
        }}>
          Student Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              Email:
            </label>
            <BasicInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
              Password:
            </label>
            <BasicInput
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <BasicButton
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </BasicButton>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ color: '#007bff', textDecoration: 'none' }}
          >
            Sign up
          </Link>
        </div>

        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '20px',
          fontSize: '12px'
        }}>
          <strong>Demo Account:</strong><br />
          Email: djkavyasri.1318@gmail.com<br />
          Password: NJw8YmiwJt2V:cc
        </div>
      </div>
    </div>
  );
}
