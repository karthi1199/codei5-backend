const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get("/list", RoleController.list);
router.post("/create", RoleController.create);
router.get("/get/:id", RoleController.get);
router.patch("/update/:id", RoleController.update);
router.delete("/delete/:id", RoleController.delete);

module.exports = router;