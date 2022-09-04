const express = require("express");

const router = express.Router();

const {
  login,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/users");
const { isResetTokenValid } = require("../middleware/users");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);

module.exports = router;
