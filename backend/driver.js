const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToMongoDB } = require('./driverdb');

const app = express();
app.use(express.json());
app.use(cors());

connectToMongoDB();

const driverSchema = new mongoose.Schema({
  fullName: { type: String },
  dob: { type: String },
  driversLicence: { type: String },
  address: { type: String },
  licenceNumber: { type: String },
  licenceClass: { type: String },
  endorsements: { type: String },
  restrictions: { type: String },
});

const Driver = mongoose.model('Driver', driverSchema);

app.post('/drivers', async (req, res) => {
  const { fullName, dob, driversLicence, address, licenceNumber, licenceClass, endorsements, restrictions } = req.body;
  try {
    const newDriver = await Driver.create({
      fullName,
      dob,
      driversLicence,
      address,
      licenceNumber,
      licenceClass,
      endorsements,
      restrictions
    });
    console.log('New driver created:', newDriver);
    res.status(201).json(newDriver);
  } catch (error) {
    console.error('Error submitting driver:', error);
    res.status(500).json({ message: 'Error submitting driver' });
  }
});

app.get('/drive', async (req, res) => {
  try {
    const drivers = await Driver.find();
    console.log('Retrieved drivers:', drivers);

    let tableHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Drivers</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container mt-5">
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Driver's Licence</th>
                <th>Address</th>
                <th>Licence Number</th>
                <th>Licence Class</th>
                <th>Endorsements</th>
                <th>Restrictions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
    `;

    drivers.forEach((user) => {
      tableHtml += `
        <tr>
          <td>${user.title}</td>
          <td>${user.}</td>
          <td>${driver.driversLicence}</td>
          <td>${driver.address}</td>
          <td>${driver.licenceNumber}</td>
          <td>${driver.licenceClass}</td>
          <td>${driver.endorsements}</td>
          <td>${driver.restrictions}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteDriver('${driver._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

    tableHtml += `
            </tbody>
          </table>
        </div>
        <script>
          async function deleteDriver(id) {
            try {
              const response = await fetch('/drivers/' + id, {
                method: 'DELETE'
              });
              if (response.ok) {
                alert('Driver deleted successfully');
                location.reload();
              } else {
                alert('Error deleting driver');
              }
            } catch (error) {
              console.error('Error deleting driver:', error);
              alert('Error deleting driver');
            }
          }
        </script>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(tableHtml);
  } catch (error) {
    console.error('Error retrieving drivers:', error);
    res.status(500).json({ message: 'Error retrieving drivers' });
  }
});

app.delete('/drivers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    console.log('Deleted driver:', deletedDriver);
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Error deleting driver' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
