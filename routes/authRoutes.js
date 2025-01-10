const express = require('express');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

router.use(express.json());

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
module.exports = router;