const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");

router.get("/", controller.getSignUp);

//user signup
router.post("/signup", controller.postSignUp);

module.exports = router;
