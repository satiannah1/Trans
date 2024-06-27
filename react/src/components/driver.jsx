import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const FormComponent = () => {
  const [user, setUser] = useState({
    title: '',
    firstname: '',
    lastname: '',
    position: '',
    company: '',
    businessarena: '',
    employees: '',
    streetno: '',
    additional: '',
    zip: '',
    place: '',
    country: '',
    code: '',
    phone: '',
    email: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (key) => (event) => {
    setUser({ ...user, [key]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/users', user);

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
  const handleSubmits = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/users', user);

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
    <section className="form-container">
      <div className="card form-card one">
        <h5>General Information</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              onChange={handleChange('title')}
              value={user.title}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                onChange={handleChange('firstname')}
                value={user.firstname}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                onChange={handleChange('lastname')}
                value={user.lastname}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              placeholder="Position"
              onChange={handleChange('position')}
              value={user.position}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              placeholder="Company"
              onChange={handleChange('company')}
              value={user.company}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="businessArena">Business Arena</label>
              <input
                type="text"
                className="form-control"
                id="businessArena"
                placeholder="Business Arena"
                onChange={handleChange('businessarena')}
                value={user.businessarena}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="employees">Employees</label>
              <input
                type="text"
                className="form-control"
                id="employees"
                placeholder="Employees"
                onChange={handleChange('employees')}
                value={user.employees}/>
                <button type="submit">Register</button>
                <a href="">View Records</a>
            </div>
          </div>
        </form>
      </div>
      <div className="card form-card two">
        <h5>Contact Details</h5>
        <form onSubmit={handleSubmits}>
          <div className="form-group">
            <label htmlFor="streetNr">Street Nr</label>
            <input
              type="number"
              className="form-control"
              id="streetNr"
              placeholder="Street Nr"
              onChange={handleChange('streetno')}
              value={user.streetno}
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <input
              type="text"
              className="form-control"
              id="additionalInfo"
              placeholder="Additional Information"
              onChange={handleChange('additional')}
              value={user.additional}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="number"
                className="form-control"
                id="zipCode"
                placeholder="Zip Code"
                onChange={handleChange('zip')}
                value={user.zip}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="place">Place</label>
              <input
                type="text"
                className="form-control"
                id="place"
                placeholder="Place"
                onChange={handleChange('place')}
                value={user.place}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Country"
              onChange={handleChange('country')}
              value={user.country}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Code"
                onChange={handleChange('code')}
                value={user.code}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange('phone')}
                value={user.phone}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Your Email"
              onChange={handleChange('email')}
              value={user.email}
            />
          </div>
          <button type="submit">Register</button>
        <a href="">View</a>
          
        </form>
      </div>
    </section>
  );
};

export default FormComponent;
