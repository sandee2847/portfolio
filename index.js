const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your API endpoint
app.post('/sendemail', (req, res) => {
  try {
    // Get the data from the request body
    console.log("data",req.body);
    const data=req.body;
    const {name, email, contact, message}=data;
    if (!email || !contact || !name) {
      throw new Error('Invalid data provided');
    }
    
    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fugiganiyar14@gmail.com',
        pass: 'ysklttfvlgvtcxwf'
      }
    });
  
    // Configure the mail options
    const mailOptions = {
      from: 'fugiganiyar14@gmail.com',
      to: 'fugiganiyar@gmail.com',
      subject: 'New message from your website',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Contact: ${contact}</p><p>Message: ${message}</p>`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // If there was an error, set the status to 500 and return the error message
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        // If the email was sent successfully, set the status to 200 and return a success message
        console.log(`Email sent: ${info.response}`);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ status: false, message: "catch block error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();

// const port = process.env.PORT || 3000;

// // Configure body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Enable CORS for all routes
// app.use(cors());

// // Define your API endpoint
// app.post('/sendemail', (req, res) => {
//   try {
//     // Get the data from the request body
//     console.log("data",req.body);
//     const data=req.body;
//     const {name, email, contact, message}=data;
//     if (!email || !contact || !name) {
//       throw new Error('Invalid data provided');
//     }
//     res.status(200).json({ message: 'Email sent successfully' });
    
//     // Configure the nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'fugiganiyar14@gmail.com',
//         pass: 'ysklttfvlgvtcxwf'
//       }
//     });
  
//     // Configure the mail options
//     const mailOptions = {
//       from: 'fugiganiyar14@gmail.com',
//       to: 'fugiganiyar@gmail.com',
//       subject: 'New message from your website',
//       html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Contact: ${contact}</p><p>Message: ${message}</p>`
//     };
  
//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         // If there was an error, set the status to 500 and return the error message
//         console.log(error);
//         res.status(500).send('Error sending email');
//       } else {
//         // If the email was sent successfully, set the status to 200 and return a success message
//         console.log(`Email sent: ${info.response}`);
//         res.status(200).send('Email sent successfully');
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(400).send({ status: false, message: "catch block error" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
