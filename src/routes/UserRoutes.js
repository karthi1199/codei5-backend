const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get("/list", UserController.list);
router.post("/create", UserController.create);
router.get("/get/:id", UserController.get);
router.patch("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);

module.exports = router;