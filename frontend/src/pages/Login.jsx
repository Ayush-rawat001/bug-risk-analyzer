import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { saveUser } from '../utils/auth';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);
      
      // Check if response and data exist
      if (!response || !response.data) {
        setError('Invalid response from server');
        setLoading(false);
        return;
      }

      const user = response.data.user;
      
      // Validate user object
      if (!user) {
        setError('User data not found in response');
        setLoading(false);
        return;
      }

      if (!user.role) {
        setError('User role not found. Please contact administrator.');
        setLoading(false);
        return;
      }

      saveUser(user);

      // Redirect based on role
      if (user.role === 'manager') {
        navigate('/manager/dashboard');
      } else if (user.role === 'tester') {
        navigate('/tester/dashboard');
      } else if (user.role === 'developer') {
        navigate('/developer/dashboard');
      } else {
        setError(`Unknown user role: ${user.role}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to BRAT</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

