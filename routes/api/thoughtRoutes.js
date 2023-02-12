const router = require('express').Router();
const {
  getThoughts,           //get all thoughts
  getSingleThought,      // get single thought
  createThought,         //TO DO: (don't forget to push the created thought's _id to the associated user's thoughts array field)
  updateThought,         // put - update a thought  
  deleteThought,
  createThoughtReaction,
  removeThoughtReaction,
//   addVideoResponse,
//   removeVideoResponse,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createThoughtReaction); //TO DO: POST to create a reaction stored in a single thought's reactions array field

// // /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(removeThoughtReaction);

module.exports = router;