const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.videoId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new Thought
    createThought(req, res) {
      Thought.create(req.body)   
        .then((user) => res.json(user)) // 
        .catch((err) => res.status(500).json(err));
          
    },
    updateThought(req, res) { 
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((user) => res.json(user)) // 
      .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.ThoughtId })
      .then((user) => res.json(user)) // 
      .catch((err) => res.status(500).json(err));
    },

    //add new reaction
    addThoughtReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }}, 
            { runValidators: true, new: true }
        )
            .then((thought) => res.json(thought))// 
            .catch((err) => res.status(500).json(err));
      },
          
    // Remove thought reaction
    removeThoughtReaction(req, res) {
      Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
  };
  

