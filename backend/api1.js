const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToMongoDB } = require('./connect');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// User Schema and Model
const userSchema = new mongoose.Schema({
  streetno: String,
  additional: String,
  zip: String,
  place: String,
  country: String,
  code: String,
  phone: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await User.create(userData);
    console.log('New user created:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
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
                <th>Street Nr</th>
                <th>Additional Info</th>
                <th>Zip</th>
                <th>Place</th>
                <th>Country</th>
                <th>Code</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actio</th>
              </tr>
            </thead>
            <tbody>
    `;

    users.forEach((user) => {
      tableHtml += `
        <tr>
          <td>${user.streetno}</td>
          <td>${user.additional}</td>
          <td>${user.zip}</td>
          <td>${user.place}</td>
          <td>${user.country}</td>
          <td>${user.code}</td>
          <td>${user.phone}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
            <button class="btn btn-primary" onclick="editUser('${user._id}')">Edit</button>
          </td>
        </tr>
        <tr id="editForm-${user._id}" style="display: none;">
          <td colspan="9">
            <form onsubmit="updateUserForm(event, '${user._id}')">
              <input type="text" name="streetno" placeholder="Street Nr" value="${user.streetno}" />
              <input type="text" name="additional" placeholder="Additional Info" value="${user.additional}" />
              <input type="text" name="zip" placeholder="Zip" value="${user.zip}" />
              <input type="text" name="place" placeholder="Place" value="${user.place}" />
              <input type="text" name="country" placeholder="Country" value="${user.country}" />
              <input type="text" name="code" placeholder="Code" value="${user.code}" />
              <input type="text" name="phone" placeholder="Phone" value="${user.phone}" />
              <input type="text" name="email" placeholder="Email" value="${user.email}" />
              <button type="submit" class="btn btn-success">Update</button>
            </form>
          </td>
        </tr>
      `;
    });

    tableHtml += `
            </tbody>
          </table>
        </div>
        <script>
          async function deleteUser(id) {
            try {
              const response = await fetch('/users/' + id, {
                method: 'DELETE'
              });
              if (response.ok) {
                alert('User deleted successfully');
                location.reload();
              } else {
                alert('Error deleting user');
              }
            } catch (error) {
              console.error('Error deleting user:', error);
              alert('Error deleting user');
            }
          }

          function editUser(id) {
            document.getElementById('editForm-' + id).style.display = 'table-row';
          }

          async function updateUserForm(event, id) {
            event.preventDefault();
            const form = event.target;
            const updatedData = {
              streetno: form.streetno.value,
              additional: form.additional.value,
              zip: form.zip.value,
              place: form.place.value,
              country: form.country.value,
              code: form.code.value,
              phone: form.phone.value,
              email: form.email.value
            };

            try {
              const response = await fetch('/users/' + id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
              });
              if (response.ok) {
                alert('User updated successfully');
                location.reload();
              } else {
                alert('Error updating user');
              }
            } catch (error) {
              console.error('Error updating user:', error);
              alert('Error updating user');
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
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Updated user:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Deleted user:', deletedUser);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
