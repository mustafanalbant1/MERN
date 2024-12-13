const express = require("express");
const {
  register,
  login,
  logOut,
  forgotPassword,
  resetPassword,
  userDetail,
} = require("../controller/user");
const { authenticationMid } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/forgotPassword", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/me", authenticationMid, userDetail);

module.exports = router;
