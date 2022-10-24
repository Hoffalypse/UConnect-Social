const router = require('express').Router();
const { User, Thought } = require('../../models');

// -----------at /api/thoughts ------------------


  //get all Thoughts
  router.get('/', (req, res) => {
   
    Thought.find({}, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  //post a new thought 
  
  router.post ('/',  (req, res) => {
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
  router.put('/:_id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params._id }, {thoughtText: req.body.thoughtText}, {new:true}, (err, result) => {
    if (result) {
       res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'This was not Updated' });
    }
  });
  });
  
  //delete a thought by _id
  router.delete('/:_id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params._id }, (err, result) => {
    if (result) {
       res.status(200).json({message:'This Thought has been deleted'});
    } else {
      res.status(500).json({ message: 'This was not Updated' });
    }
  });
  });
  
   
  //add reaction to thought 
  router.post('/:thoughtId/reactions',(req, res) =>{
    Thought.findOneAndUpdate({_id:req.params.thoughtId},{reactions: req.body}, { new: true },(err, result) => {
      if (result) {
        res.status(200).json(result);
     } else {
       res.status(500).json({ message: 'This Reaction was not Added' });
     }
   }); 
  })
  
  //delete specific reaction 
  router.delete('/:thoughtId/reactions/:reactionId',(req, res) =>{
    Thought.findOneAndUpdate({_id:req.params.thoughtId},{$pull: { reactions: { reactionId: req.params.reactionId }}},{ new: true },(err, result) => {

      if (result) {
        res.status(200).json(result);
     } else {
       res.status(500).json({err});
     }
   }); 
  })

  module.exports = router;