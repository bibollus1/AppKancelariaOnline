const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivFilesSchema = new Schema({
  fieldname:{
    type: String
  },
  originalname:{
    type: String,
  },
  encoding:{
    type: String,
  },
  path:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String
  },
  sharedTo:[String]

});

// Create collection and add schema
mongoose.model('privfiles', PrivFilesSchema);
