const express = require('express');
const router = express.Router();
const userController = require('../userController');

router.post('/register', (req, res, next) => {
  console.log('POST /register');
  userController.register(req, res, next);
});


router.post('/login', (req, res, next) => {
  console.log('POST /login');
  userController.login(req, res, next);
});


router.post('/booking', (req, res, next) => {
  console.log('POST /booking');
  userController.booking(req, res, next);
});


// Assuming you have a function in userController for dashboard
router.get('/dashboard', (req, res, next) => {
  console.log('GET /dashboard');
  userController.getUsers(req, res, next);
});

module.exports = router;
