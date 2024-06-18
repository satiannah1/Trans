const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { connectToMongoDB } = require('./driverdb');

const app = express();
app.use(express.json());
app.use(cors());
connectToMongoDB();

const LogSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
});

const Log = mongoose.model('Log', LogSchema);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await Log.create({ name, email });
    console.log('New user registered:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Log.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('User logged in:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/drive', async (req, res) => {
  try {
    const users = await Log.find();
    console.log('Retrieved users:', users);

    let tableHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Users</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container mt-5">
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>password<th>
              </tr>
            </thead>
            <tbody>
    `;

    users.forEach((user) => {
      tableHtml += `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>

        </tr>
      `;
    });

    tableHtml += `
            </tbody>
          </table>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(tableHtml);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
