const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");

router.get("/", controller.get);

//user signup
router.post("/signup", controller.post);

module.exports = router;
