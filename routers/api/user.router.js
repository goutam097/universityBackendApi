const router = require("express").Router();
const userController = require("../../controllers/api/user.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);


module.exports = router;