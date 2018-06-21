const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const RequestSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: 'nowe',
  },
  body:{
    type: String,
    required: true
  },

  updates: [{
    updateBody:{
      type: String,
      required: true
    },
    updateDate:{
      type: Date,
      default: Date.now
    },
    // Creating answer user
    updateUser:{
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    updateFirstName:{
      type: String
    },
    updateLastName:{
      type: String
    },

  }],
  // Creating request user
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  firstName: {
    type: String
  },
  lastName:{
    type: String
  },
  email:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});



// Create collection and add schema
mongoose.model('requests', RequestSchema);
