const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true

     },
    email: {
        type: String,
        required: true,
        unique: true,
        match: Schema.Types.Email

     },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  });
  
userSchema
.virtual('friendCount')
.get(function () {
  return `${this.friends.length}`;
})

   // Initialize the User model
  const User = model('user', userSchema);
  module.exports = User;