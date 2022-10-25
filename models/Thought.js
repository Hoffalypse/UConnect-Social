const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reaction model to be added to the thought model 
const reactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        trim: true
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
        get: formatTime => moment(formatTime).format("MMM DD, YYYY [at] hh:mm a"),
       },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
  );

  //creation of the thought model 
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
        get: formatTime => moment(formatTime).format("MMM DD, YYYY [at] hh:mm a"),
       },
      username: {
        type: String,
        required:true,
      },
      reactions:  [reactionSchema],
    
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    },
)

     //add function to count and display the reactions per thought 
    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length
    })
    //initialize the thought model 
    const Thought = model('thought', thoughtSchema);

  

module.exports = Thought;