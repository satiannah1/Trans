import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Driver = () => {
  const [driver, setDriver] = useState({
    fullName: '',
    dob: '',
    driversLicence: '',
    address: '',
    licenceNumber: '',
    licenceClass: '',
    endorsements: '',
    restrictions: '',
  });

  const handleChange = (key, event) => {
    setDriver({ ...driver, [key]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = 'http://localhost:3000/drive';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/drivers', driver);
      if (response.status === 201) {
        setDriver({
          fullName: '',
          dob: '',
          driversLicence: '',
          address: '',
          licenceNumber: '',
          licenceClass: '',
          endorsements: '',
          restrictions: '',
        });
        console.log('Driver data submitted successfully!');
        fetchDrivers();
      } else {
        console.error('Failed to submit driver data');
      }
    } catch (error) {
      console.log('Error submitting driver data:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/drive');
      console.log('Fetched drivers:', response.data);
    } catch (error) {
      console.log('Error retrieving drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  console.log('Current Driver State:', driver);

  return (
    <div className="driver-container">

      <h1 className="driver-title">Register here</h1>
      <form onSubmit={handleSubmit} className="driver-form">

        <input
          type="text"
          value={driver.fullName}
          onChange={(e) => handleChange('fullName', e)}
          placeholder="Full Name"
          className="driver-input"
        />
        <input
          type="date"
          value={driver.dob}
          onChange={(e) => handleChange('dob', e)}
          placeholder="Date of Birth"
          className="driver-input"
        />
        <input
          type="text"
          value={driver.driversLicence}
          onChange={(e) => handleChange('driversLicence', e)}
          placeholder="Driver's Licence"
          className="driver-input"
        />
        <input
          type="text"
          value={driver.address}
          onChange={(e) => handleChange('address', e)}
          placeholder="Address"
          className="driver-input"
        />
        <input
          type="number"
          value={driver.licenceNumber}
          onChange={(e) => handleChange('licenceNumber', e)}
          placeholder="Licence Number"
          className="driver-input"
        />
        <input
          type="text"
          value={driver.licenceClass}
          onChange={(e) => handleChange('licenceClass', e)}
          placeholder="Licence Class"
          className="driver-input"
        />
        <input
          type="text"
          value={driver.endorsements}
          onChange={(e) => handleChange('endorsements', e)}
          placeholder="Endorsements"
          className="driver-input"
        />
        <input
          type="text"
          value={driver.restrictions}
          onChange={(e) => handleChange('restrictions', e)}
          placeholder="Restrictions"
          className="driver-input"
        />
        <button type="submit" className="driver-submit">Submit</button>
        <a href="#" onClick={handleClick} className="driver-view">View Records</a>
      </form>
      <ol className="driver-task">
        <li>Task: {driver.fullName}</li>
      </ol>
    </div>
  );
};

export default Driver;
