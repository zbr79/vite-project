import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AccountPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State to handle success messages
    const [connectionError, setConnectionError] = useState(''); // State to handle connection errors

    useEffect(() => {
        // Check connection to the backend
        const checkConnection = async () => {
            try {
                // Make a test request to your backend's health check endpoint
                await axios.get('http://vite-project-zbr.us-west-2.elasticbeanstalk.com/api/test'); // Ensure the scheme is correct (http or https)
                setConnectionError('');
            } catch (err) {
                setConnectionError('Failed to connect to the backend. Please check your server.');
            }
        };

        checkConnection();
    }, []);

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
            const response = await axios.post('http://vite-project-zbr.us-west-2.elasticbeanstalk.com/api/auth/login', { 
                username, 
                password 
            });

            console.log('Response status code:', response.status); // Log the status code

            if (response.status === 200) {
                // Successful login
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
                console.log('Response status code:', error.response.status); // Log the status code
                console.log('Response data:', error.response.data); // Log the response data
            
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
            <h2 className="account-page-title">Login Page</h2>
            {connectionError && <p className="error-message">{connectionError}</p>}
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

export default LoginPage;
