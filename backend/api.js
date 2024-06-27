const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectToMongoDB } = require('./connect');

const app = express();
const port = 3001;

// Middleware
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
  title: String,
  firstname: String,
  lastname: String,
  position: String,
  company: String,
  businessarena: String,
  employees: String,
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

// Routes
// POST /api/users - Create a new user
app.post('/users', async (req, res) => {
  const {
    title,
    firstname,
    lastname,
    position,
    company,
    businessarena,
    employees,
    streetno,
    additional,
    zip,
    place,
    country,
    code,
    phone,
    email,
  } = req.body;

  try {
    const newUser = await User.create({
      title,
      firstname,
      lastname,
      position,
      company,
      businessarena,
      employees,
      streetno,
      additional,
      zip,
      place,
      country,
      code,
      phone,
      email,
    });
    console.log('New user created:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});


 
app.get('/user', async (req, res) => {
 try {
   const drivers = await User.find();
   console.log('Retrieved drivers:', users);

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
               <th></th>
               <th>Title</th>
               <th>Firstname</th>
               <th>Lastname</th>
               <th>Position</th>
               <th>Company</th>
               <th>Bussiness Arena</th>
               <th>Employees</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
   `;

   drivers.forEach((user) => {
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


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.delete('/drivers/:id', async (req, res) => {
 const { id } = req.params;
 try {
   const deletedDriver = await User.findByIdAndDelete(id);
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
// Start Server
function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
