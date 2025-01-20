const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");

router.get("/:username", controller.getSignUp);

//user signup nd login
router.post("/signup", controller.postSignUp);
router.post("/login", controller.postLogin);

module.exports = router;
