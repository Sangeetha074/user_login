import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


 const Signup = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://student-login-1.onrender.com/insert', {
        username,
        password,
      });

      setMessage(response.data.message || 'Signup successful!');
      setTimeout(() => {
        navigate('/page');
      }, 2000);
    } catch (error) {
      setMessage('Error inserting data. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group2">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="input-group2">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="input-group2">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <button className="submit-btn">Sign Up</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup
