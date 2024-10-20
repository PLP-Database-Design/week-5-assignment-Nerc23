// Import some dependencies/ packages 

// HTTP framework for handling requests/responses 
const express = require('express');
//Instance of express framework
const app = express(); 
// DBMS Mysql 
const mysql = require('mysql2');
// Cross Origin Resourse Sharing 
const cors = require('cors');
// Environment variable doc 
const dotenv = require('dotenv');

//
app.use(express.json());
app.use(cors());
dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
  // If no connection = No wedding 
  if(err) return console.log("Error connecting to the mysql");

  //If connect works successfully 
  console.log("Connected to the database", db.threadId); 
}) 

//  Question 1 goes here
// Get information on the patients & display info:
app.get('/patients', (req, res) => {

  db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
    if (err) {
      console.error('Error retrieving patients:', err);
      res.status(500).send('Error Retrieving data')
    } else{
       //Display the records to the browser 
    res.render(results);
    }
  });

});

// Question 2 goes here
// Get information on the providers & display info:
app.get('/providers', (req, res) => {
  db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
    if (err) {
      console.error('Error retrieving providers specialty:', err);
      res.status(500).send('Error Retrieving data')
    } else{
      //Display the records to the browser 
    res.render(results);
    }
  });
});

// Question 3 goes here
// Sort patients by first name:
app.get('/patients/:first_name', (req, res) => {
  const name = req.params.first_name;
  db.query('SELECT * FROM patients WHERE first_name = ?', [name], (err, results) => {
    if (err) {
      console.error('Error retrieving patients:', err);
      res.status(500).send('Error Retrieving data')
    } else{
    res.render(results);
    }
  });
});

// Question 4 goes here
// Sort providers by speciality:
app.get('/providers/:provider_specialty', (req, res) => {
  const p_specialty = req.params.specialty;
  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [p_specialty], (err, results) => {
    if (err) {
      console.error('Error retrieving providers:', err);
      res.status(500).send('Error Retrieving data')
    } else {
    res.render(results);
    }
  });
});


// Start the server 
const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   });

