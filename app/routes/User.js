const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");

// [MIDDLE WARE] //
const { verifyToken, checkAdminStatus } = require("../middleware/Auth");

router.get("/:username", verifyToken, controller.showHomePage);
router.get("/:username/profile", verifyToken, controller.showProfilePage);

//logout user
router.get("/:username/logout", verifyToken, controller.logOut);

//user signup nd login
router.post("/signup", controller.postSignUp);
router.post("/login", controller.postLogin);

//admin route
router.get(
    "/:username/adminboard",
    verifyToken,
    checkAdminStatus,
    controller.showAdminPage
);

module.exports = router;
