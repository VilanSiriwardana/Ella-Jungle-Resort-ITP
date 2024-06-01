const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.userId) {
        throw new Error('Invalid token');
      }

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
      next();
    } else {
      console.log('Not authorized as an admin');
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = { protect,isAdmin  };
