const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");

// [MIDDLE WARE] //
const { verifyToken } = require("../middleware/Auth");

router.get("/:username", verifyToken, controller.showHomePage);
router.get("/:username/profile", verifyToken, controller.showProfilePage);

//return user data to profile
router.post("/:username/getUserData", verifyToken, controller.getUserData);

//user signup nd login
router.post("/signup", controller.postSignUp);
router.post("/login", controller.postLogin);

module.exports = router;
