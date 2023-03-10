// const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');
const Reaction = require('./reaction');

// Schema to create Post model
const thoughtSchema = new Schema(            
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        }, 
        createdAt: {
            type: Date,
            default: Date.now, //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[Reaction],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true, //  what is this line?
        },
        id: false,
      }
    );


// Create virtual to retrieve length of reactions array field on query
thoughtSchema
    .virtual('reactionCount').get(function () {
        return this.reactions.length;
    });


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

  
