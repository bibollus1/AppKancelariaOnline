// Biblioteki i moduły NPM
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Route do strony index
app.get('/',(req, res)=>{
  res.send('It works!');
});

// Ustawienie portu dla Heroku lub portu lokalnego
const port = process.env.PORT || 3000;
// Nasłuchiwanie portu
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
