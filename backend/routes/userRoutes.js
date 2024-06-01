const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  adminGetProfile,
  adminUpdateProfile,
  UserdeleteUser,
  sendPasswordResetMail,
  GetPasswordResetMail,
  GetPasswordResetMail2
} = require('../controllers/userController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');


//Regiser New user as Guest or Travel Agent
router.post('/', registerUser);

//Login User
router.post('/auth', authUser);

//Logout User
router.post('/logout', logoutUser);

//User Delete User Profile
router.delete('/',protect, UserdeleteUser);

//User Get,Update User Profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

  
//User Resetting the Password
router.post('/forgot-password',sendPasswordResetMail);
router.get('/forgot-password/:id/:token',GetPasswordResetMail);
router.post('/forgot-password/:id/:token',GetPasswordResetMail2);

//Admin get all users
router.get('/all',getAllUsers);

//Admin get specific User Profile
router.get('/specific/:id',adminGetProfile);

//Admin update specidic user Profile
router.put('/specific/:id',adminUpdateProfile);

//Admin Delete specific user Profile
router.delete('/:id',deleteUser);

module.exports = router;
