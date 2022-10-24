const express = require('express');
const db = require('./config/connection');

const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get all users
app.get('/api/users', (req, res) => {
 
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

//post a new user
app.post('/api/users', (req, res) => {
  const newUser = new User({ username: req.body.username, email: req.body.email});
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//get a single user by id
app.get('/api/users/:_id', (req, res) => {
  User.findOne({ _id: req.params._id }, (err, result) => {
  if (result) {
     res.status(200).json(result);
  } else {
    res.status(500).json({ message: 'something went wrong' });
  }
});
});

//update a user by id 
app.put('/api/users/:_id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params._id }, {email: req.body.email}, {new:true}, (err, result) => {
  if (result) {
     res.status(200).json(result);
  } else {
    res.status(500).json({ message: 'Not Updated' });
  }
});
});

//delete a user by ID
app.delete('/api/users/:_id', (req, res) => {
  User.findOneAndDelete({ _id: req.params._id }, (err, result) => {
  if (result) {
     res.status(200).json({message:'User was successfully deleted'});
  } else {
    res.status(500).json({ message: 'User Was Not Deleted' });
  }
});
});

//get all Thoughts
app.get('/api/thoughts', (req, res) => {
 
  Thought.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

//post a new thought 

app.post ('/api/thoughts',  (req, res) => {
  const newThought = Thought.create(req.body)
  .then(({_id}) => {
    return User.findOneAndUpdate(
      { _id: req.body.userId },
      {$addToSet:{ thoughts: _id }} ,
      { new: true }
    );
  })
  if (newThought) {
    res.status(200).json(newThought);
 } else {
   res.status(500).json({ message: 'Your post was not added' });
 }
})


//update a thought by _id
app.put('/api/thoughts/:_id', (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params._id }, {thoughtText: req.body.thoughtText}, {new:true}, (err, result) => {
  if (result) {
     res.status(200).json(result);
  } else {
    res.status(500).json({ message: 'This was not Updated' });
  }
});
});

//delete a thought by _id
app.delete('/api/thoughts/:_id', (req, res) => {
  Thought.findOneAndDelete({ _id: req.params._id }, (err, result) => {
  if (result) {
     res.status(200).json({message:'This Thought has been deleted'});
  } else {
    res.status(500).json({ message: 'This was not Updated' });
  }
});
});

//add a friend to user
app.post('/api/users/:_id/friends/:friendId',(req, res) =>{
  User.findOneAndUpdate({ _id: req.params._id },{ friends: req.params.friendId }, { new: true }, (err, result) => {
    if (result) {
      res.status(200).json(result);
   } else {
     res.status(500).json({ message: 'You are not friends with this person' });
   }
 });
});

//delete a friend from user
app.delete('/api/users/:_id/friends/:friendId',(req, res) =>{
  User.findOneAndDelete({ _id: req.params._id },{ friends: req.params.friendId }, (err, result) => {
    if (result) {
      res.status(200).json({message:'This user has been removed from your friends list'});
   } else {
     res.status(500).json({ message: 'You are still friends with this person' });
   }
 });
});

//add reaction to thought 
app.post('/api/thoughts/:thoughtId/reactions',(req, res) =>{
  Thought.findOneAndUpdate({_id:req.params.thoughtId},{reactions: req.body}, { new: true },(err, result) => {
    if (result) {
      res.status(200).json(result);
   } else {
     res.status(500).json({ message: 'This Reaction was not Added' });
   }
 }); 
})

//delete specific reaction 
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId',(req, res) =>{
  console.log({_id:req.params.thoughtId})
  Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull: { reactions: { reactionId: req.params.reactionId }}},{ new: true },(err, result) => {

    if (result) {
      res.status(200).json(result);
   } else {
    console.log({reactions:{reactionId:req.params.reactionId}})
     res.status(500).json({err});
   }
 }); 
})


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });