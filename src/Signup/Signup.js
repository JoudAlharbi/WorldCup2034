import React, { useState } from 'react';
import './AuthStyle.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ fullname: '', email: '', username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const formData = new URLSearchParams();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      const response = await fetch('http://localhost/fifa-auth/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const result = await response.text();
      setMessage(result);
      if (result.includes('successfully')) navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="form-left">

          <span className="subtitle">Start your journey</span>
          <h2 className="title">Sign up</h2>

          <input name="fullname" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <div className="social-divider">
            <hr />
            <span>or sign up with</span>
            <hr />
          </div>

          <div className="social-icons">
            <button><img src={process.env.PUBLIC_URL + '/Facebook_icon.png'} alt="Facebook" /></button>
            <button><img src={process.env.PUBLIC_URL + '/google-icon.png'} alt="Google" /></button>
            <button><img src={process.env.PUBLIC_URL + '/Apple_icon.png'} alt="Apple" /></button>
          </div>
          <button className="Abutton" onClick={handleSignup}>SIGN UP</button>
          <p className="login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
          <p>{message}</p>
        </div>
        <div
          className="form-right"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/signup.png'})`,
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

export default Signup;