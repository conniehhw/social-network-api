const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
             required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,          
            },

        thoughts: [
            {
                // _id: Number,
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        
        friends: [
            {
                // _id: Number,
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
        },
       {      
        toJSON: {
            virtuals: true, 
        },
        id: false,
    }
  );

// Create virtual to retrieve length of user's friends array field on query
userSchema
    .virtual('friendCount').get(function () {
        return this.friends.length;
    });


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
