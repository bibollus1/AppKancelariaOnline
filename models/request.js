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
  body:{
    type: String,
    required: true
  },
  feedback:[{
    answerBody:{
      type: String,
      required: true
    },
    answerDate:{
      type: Date,
      default: Date.now
    },
    // Creating answer user
    answerUser:{
      type: Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  // Creating request user
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// Create collection and add schema
mongoose.model('requests', RequestSchema);
