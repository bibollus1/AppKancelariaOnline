const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  googleID:{
    type: String,
  },
  email:{
    type: String,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  image:{
    type: String
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  permission:{
    type: String,
    required: false,
    default: 'user'
  }
});


// Create collection and add schema
mongoose.model('users', UserSchema);
