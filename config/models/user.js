const { Schema, model } = require('Mongoose');

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
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
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
