const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

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
        get: timeFormat => moment(timeFormat).format('MMMM Do YYYY, h:mm:ss a'),
      },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  );

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
        get: timeFormat => moment(timeFormat).format('MMMM Do YYYY, h:mm:ss a')
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
        },
        id: false,
    },
)
    //initialize the thought model 
    const Thought = model('thought', thoughtSchema);

  

module.exports = Thought;