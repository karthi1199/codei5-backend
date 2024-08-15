const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get("/list", CourseController.list);
router.post("/create", CourseController.create);
router.get("/get/:id", CourseController.get);
router.patch("/update/:id", CourseController.update);
router.delete("/delete/:id", CourseController.delete);

module.exports = router;