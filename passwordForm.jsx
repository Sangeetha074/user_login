import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasswordForm = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (newPassword !== reEnterPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://student-login-1.onrender.com/forgot_password', 
                { username, new_password: newPassword }, 
                { headers: { 'Content-Type': 'application/json' } }
            );
            setMessage(response.data.message || 'Password reset successful!');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="input-group3">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group3">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group3">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Submitting...' : 'Reset Password'}
                    </button>
                </form>

                {message && <p className="message">{message}</p>}

                <p className="back-link">
                    <Link to="/">Back to Login</Link>
                </p>
            </div>
        </div>
    );
    
};

export default PasswordForm;