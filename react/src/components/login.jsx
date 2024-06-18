import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Log = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (key, event) => {
    setUser({ ...user, [key]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/register', user);

      if (response.status === 201) {
        setSuccessMessage('User registered successfully.');
        setUser({ name: '', email: '' });
      } else {
        setError('Failed to register user.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Register</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          value={user.name}
          onChange={(e) => handleChange('name', e)}
          placeholder="User Name"
          className="signup-input"
          required
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => handleChange('email', e)}
          placeholder="Email"
          className="signup-input"
          required
        />
        <button type="submit" className="signup-submit">Register</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Log;
