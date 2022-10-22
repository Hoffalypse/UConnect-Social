const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    
    username: { 
        type: String, 
        required: 'Do you have a Username?',
        unique: true,
        trim: true
     },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
     },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
    //   toJSON: {
    //     virtuals: true
    // },
  });
  
userSchema
.virtual('friendCount')
.get(function () {
  return `${this.friends.length}`;
})

   // Initialize the User model
  const User = model('user', userSchema);

  User.create([
    { username: 'Hoff', email: 'hoff@gmail.com'},
    { username: 'CesarDog', email: 'Cdizzle@gmail.com'},
   
  ]);
  
  module.exports = User;