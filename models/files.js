const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  fieldname:{
    type: String
  },
  originalname:{
    type: String,
  },
  encoding:{
    type: String,
  }
});

// Create collection and add schema
mongoose.model('files', RequestSchema);
