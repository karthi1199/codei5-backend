const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get('/show/:id', ProfileController.show);

module.exports = router;