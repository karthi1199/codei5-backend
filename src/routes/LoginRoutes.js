const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);

module.exports = router;