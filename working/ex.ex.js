const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/trans', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("Connected")
})
.catch((e)=>console.error(e))


const driverSchema = new mongoose.Schema({
  fullName: {type:String},
  dob: {type:String},
  driversLicence: {type:String},
  address: {type:String},
  licenceNumber: {type:String},
  licenceClass: {type:String},
  endorsements: {type:String},
  restrictions: {type:String},
});

const Driver = mongoose.model('Driver', driverSchema);

app.use(express.json());
app.use(cors());

app.post('/drivers', async (req, res) => {
  const { fullName, dob, driversLicence, address, licenceNumber, licenceClass, endorsements, restrictions } = req.body;
  
  try {
    const newDriver = await Driver.create({
      fullName:fullName,
      dob:dob,
      driversLicence:driversLicence,
      address:address,
      licenceNumber:licenceNumber,
      licenceClass:licenceClass,
      endorsements:endorsements,
      restrictions:restrictions
    });
    res.status(201).json({ msg:"Success" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error:err.msg || 'Server error' });
  }
});

app.get('/all', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json({drivers:drivers});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:err.msg || 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});