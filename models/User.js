const { Schema, model, Types } = require('mongoose');
const userSchema = new Schema({
    

  // creation of the user model 
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
        match: [/.+@.+\..+/]
     },
    
    thoughts:  [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    },
      {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },
  );
  //function to count and display the number of friends a user has 
userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

   // Initialize the User model
  const User = model('user', userSchema);


  
  module.exports = User;