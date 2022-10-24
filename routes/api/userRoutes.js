const router = require('express').Router();
const { User } = require('../../models');

// -----------at /api/users ------------------

//get all users
router.get('/', (req, res) => {
 
    User.find({}, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  //post a new user
  router.post('/', (req, res) => {
    const newUser = new User({ username: req.body.username, email: req.body.email});
    newUser.save();
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  //get a single user by id
  router.get('/:_id', (req, res) => {
    User.findOne({ _id: req.params._id }, (err, result) => {
    if (result) {
       res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'something went wrong' });
    }
  });
  });
  
  //update a user by id 
  router.put('/:_id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params._id }, {email: req.body.email}, {new:true}, (err, result) => {
    if (result) {
       res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'Not Updated' });
    }
  });
  });
  
  //delete a user by ID
  router.delete('/:_id', (req, res) => {
    User.findOneAndDelete({ _id: req.params._id }, (err, result) => {
    if (result) {
       res.status(200).json({message:'User was successfully deleted'});
    } else {
      res.status(500).json({ message: 'User Was Not Deleted' });
    }
  });
  });
  
  //add a friend to user
  router.post('/:_id/friends/:friendId',(req, res) =>{
    User.findOneAndUpdate({ _id: req.params._id },{ friends: req.params.friendId }, { new: true }, (err, result) => {
      if (result) {
        res.status(200).json(result);
     } else {
       res.status(500).json({ message: 'You are not friends with this person' });
     }
   });
  });
  
  //delete a friend from user
  router.delete('/:_id/friends/:friendId',(req, res) =>{
    User.findOneAndDelete({ _id: req.params._id },{ friends: req.params.friendId }, (err, result) => {
      if (result) {
        res.status(200).json({message:'This user has been removed from your friends list'});
     } else {
       res.status(500).json({ message: 'You are still friends with this person' });
     }
   });
  });
 
  module.exports = router;