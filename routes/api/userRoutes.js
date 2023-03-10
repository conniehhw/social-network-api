const router = require('express').Router();
const {
  getUsers,
  getSingleUser,    // get single user by Id - how to populate thought and friend data?
  createUser,       // post a new user
  updateUser,       // put a user
  deleteUser,       // delete a user
  addFriend, 
  deleteFriend,      // add new friend to list     // remove friend from list
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:userId').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  // .post(addFriend)
  .delete(deleteFriend); 

module.exports = router;