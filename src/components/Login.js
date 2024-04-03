import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the data as URL-encoded string
    const requestBody = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody
      });
  
      if (response.ok) {
        // Login successful, extract user ID from response and navigate to user profile
        
        const userId = await response.json();
        // Store user ID in local storage
        localStorage.setItem('userId', userId);
        navigate(`recipes`); // Redirect to user profile page
      } else {
        // Login failed, display error message or handle accordingly
        const errorMessage = await response.text();
        console.error('Login failed:', errorMessage);
        // Display error message to the user
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle any network errors or other exceptions
      alert('Error during login. Please try again later.');
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
