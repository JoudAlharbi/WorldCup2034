import React, { useState } from 'react';
import './AuthStyle.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      const response = await fetch('http://localhost/fifa-auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const result = await response.text();
      setMessage(result);
      if (result.includes('successfully')) navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="form-left">
          <h2>Sign in</h2>

          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />

          <p style={{ fontSize: '12px' }}>Forgot your password?</p>

          <div className="social-divider">
            <hr />
            <span>or sign in with</span>
            <hr />
          </div>

          <div className="social-icons">
            <button><img src={process.env.PUBLIC_URL + '/Facebook_icon.png'} alt="Facebook" /></button>
            <button><img src={process.env.PUBLIC_URL + '/google-icon.png'} alt="Google" /></button>
            <button><img src={process.env.PUBLIC_URL + '/Apple_icon.png'} alt="Apple" /></button>
          </div>

          
          <button className="Abutton" onClick={handleLogin}>SIGN IN</button>
          <p className="login-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>

          <p>{message}</p>
        </div> {/* Closing form-left */}
        <div
          className="form-right"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/signup1.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative', // required for absolute positioning
            color: 'white',
          }}
        >
          <div className="form-overlay-text">
            <h2>Together for 2034</h2>
            <p>Join the FIFA journey and be part of something historic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;