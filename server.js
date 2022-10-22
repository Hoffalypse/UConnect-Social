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
    console.log('Uh Oh, something went wrong');
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
     res.status(200).json('User was successfully deleted');
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
app.post('/api/thoughts', (req, res) => {
  const newThought = new Thought({ thoughtText: req.body.thoughtText, username: req.body.username});
  newThought.save();
  if (newThought) {
    res.status(201).json(newThought);
  } else {
    
    res.status(500).json({ error: 'This did not work' });
  }
});

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

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });