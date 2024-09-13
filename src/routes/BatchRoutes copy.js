const express = require('express');
const router = express.Router();
const BatchController = require('../controllers/BatchController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get("/list", BatchController.list);
router.post("/create", BatchController.create);
router.get("/get/:id", BatchController.get);
router.patch("/update/:id", BatchController.update);
router.delete("/delete/:id", BatchController.delete);

module.exports = router;