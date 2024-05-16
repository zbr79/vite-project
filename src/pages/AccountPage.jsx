import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AccountPage.css';

function AccountPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State to handle success messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous success or error messages
        setError('');
        setSuccess('');

        // Validation
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        // Backend interaction with Axios
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { 
                username, 
                password 
            });

            if (response.status === 200) {
                // Successful authentication
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                // Set success message
                setSuccess('Login successful! Redirecting...');
                // Redirect the user to a different page
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    setError('Invalid username or password.');
                } else if (error.response.status === 404) {
                    setError('User not found.');
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
            } else {
                // The request was made but no response was received
                console.error('Error:', error.message);
                setError('Network error: No response received.');
            }
        }
    };

    return (
        <div className="account-page">
            <h2 className="account-page-title">Account Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>} {/* Display success message */}
            </form>
        </div>
    );
}

export default AccountPage;
