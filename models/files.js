const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilesSchema = new Schema({
  fieldname:{
    type: String
  },
  originalname:{
    type: String,
  },
  encoding:{
    type: String,
  },
  patch:{
    type: String
  }
});

// Create collection and add schema
mongoose.model('files', FilesSchema);
