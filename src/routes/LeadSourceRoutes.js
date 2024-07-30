const express = require('express');
const router = express.Router();
const LeadSourceController = require('../controllers/LeadSourceController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get("/list", LeadSourceController.list);
router.post("/create", LeadSourceController.create);
router.get("/get/:id", LeadSourceController.get);
router.patch("/update/:id", LeadSourceController.update);
router.delete("/delete/:id", LeadSourceController.delete);

module.exports = router;