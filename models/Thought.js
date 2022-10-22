const { Schema, model, mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

  });

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required:true,
      },
      reactions:  [reactionSchema],
    
    })
    //initialize the thought model 
    const Thought = model('thought', thoughtSchema);

    Thought.create([
        { thoughtText: 'Wow this is a really great thought', username: 'bill'},
       
       
      ]);

module.exports = Thought;