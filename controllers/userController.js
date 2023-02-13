const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// const User = require('../models/User');

module.exports = {
  getUsers(req, res) {                      //function to get all the users
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {                  // Gets a single user
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user)) // what is dbUserData referencing // change to user
      .catch((err) => res.status(500).json(err));
  },

    //updates a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // deletes user and associated thoughts
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

    // add new friend to list
      addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } })
            .then((user) => res.json(user)) // 
            .catch((err) => res.status(500).json(err));
      },

    // remove friend from list
        deleteFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: req.body } })
            .then((user) => res.json(user)) // 
            .catch((err) => res.status(500).json(err));
      },
};
