const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToMongoDB } = require('./connect');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

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
  title: String,
  firstname: String,
  lastname: String,
  position: String,
  company: String,
  businessarena: String,
  employees: String,
  
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
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Company</th>
                <th>Business Arena</th>
                <th>Employees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
    `;

    users.forEach((user) => {
      tableHtml += `
        <tr>
          <td>${user.title}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.position}</td>
          <td>${user.company}</td>
          <td>${user.businessarena}</td>
          <td>${user.employees}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
            <button class="btn btn-primary" onclick="editUser('${user._id}')">Edit</button>
          </td>
        </tr>
        <tr id="editForm-${user._id}" style="display: none;">
          <td colspan="8">
            <form onsubmit="updateUserForm(event, '${user._id}')">
              <input type="text" name="title" placeholder="Title" value="${user.title}" required />
              <input type="text" name="firstname" placeholder="First Name" value="${user.firstname}" required />
              <input type="text" name="lastname" placeholder="Last Name" value="${user.lastname}" required />
              <input type="text" name="position" placeholder="Position" value="${user.position}" required />
              <input type="text" name="company" placeholder="Company" value="${user.company}" required />
              <input type="text" name="businessarena" placeholder="Business Arena" value="${user.businessarena}" required />
              <input type="text" name="employees" placeholder="Employees" value="${user.employees}" required />
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
              title: form.title.value,
              firstname: form.firstname.value,
              lastname: form.lastname.value,
              position: form.position.value,
              company: form.company.value,
              businessarena: form.businessarena.value,
              employees: form.employees.value,
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
