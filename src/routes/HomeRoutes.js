const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const HomeController = require('../controllers/HomeController');

router.use(verifyToken);

router.get("/user-count", HomeController.count);

module.exports = router;