const express = require('express');
const router = express.Router();
const ContactUsController = require('../controllers/ContactUsController');

router.get("/list", ContactUsController.list);
router.post("/create", ContactUsController.create);
router.patch("/status-update/:id", ContactUsController.status);

module.exports = router;