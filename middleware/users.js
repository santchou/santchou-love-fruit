const { isValidObjectId } = require("mongoose");
const ResetToken = require("../models/resetToken");
const User = require("../models/users");
const { sendError } = require("../utils/helper");

module.exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.body;

  if (!token || !id) return sendError(res, "invalid request !");

  if (!isValidObjectId(id)) return sendError(res, "Invalid user id !");

  try {
    const user = await User.findById(id);
    if (!user) return sendError(res, "User not found !");

    const resetToken = await ResetToken.findOne({ owner: user._id });
    if (!resetToken) return sendError(res, "Reset token not found !");

    const isValid = await resetToken.compareToken(token);

    if (!isValid)
      return sendError(
        res,
        "Reset token is invalid, check your email and click the reset password link !"
      );

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
