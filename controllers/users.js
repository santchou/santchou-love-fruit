const User = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const config = require("../config.js");

/* const {
  generateOTP,
  mailTransport,
  generateEmailTemplate,
  generatePasswordResetTemplate,
} = require("../utils/mail");
const VerificationToken = require("../models/verificationToken");
const ResetToken = require("../models/resetToken"); */

const { sendError } = require("../utils/helper");
//const { sendError, createRandomBytes } = require("../utils/helper");
const { isValidObjectId } = require("mongoose");

const login = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().min(3).max(30).email().required(),
    password: Joi.string().min(4).max(300).required(),
  });

  const { error } = schema.validate({ email, password });

  if (error) return res.status(404).json({ message: error.details[0].message });

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: "This email does not exist in our database!" });

    /* if (!existingUser?.verified)
      return res.status(404).json({
        message: "Your account is not verified, press:",
        link: `${existingUser._id}`,
      });
 */
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch)
      return res.status(404).json({ message: "password is incorrect!" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      result: {
        email: existingUser.email,
        name: existingUser.name,
        _id: existingUser._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(3).max(30).email().required(),
    password: Joi.string().required().min(4).max(30).label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(404).json({ message: error.details[0].message });

  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "This email already exist!" });

    //const OTP = generateOTP();

    const result = new User({
      name: lastName + " " + firstName,
      email,
      password,
    });

    /*  const verificationToken = new VerificationToken({
      owner: result._id,
      token: OTP,
    });
    await verificationToken.save(); */
    await result.save();

    /* mailTransport().sendMail({
      from: `Santchou Ghislain 🚀 <${config.user}>`,
      to: result.email,
      subject: "Verify your email account",
      html: generateEmailTemplate(OTP),
    }); */

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, input1, input2, input3, input4 } = req.body;
  const otp = input1 + input2 + input3 + input4;

  if (!userId || !otp.trim())
    return sendError(res, "Invalid request, missing parameters");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user id!");

  try {
    const user = await User.findById(userId);

    if (!user) return sendError(res, "sorry, user not found!");

    if (user.verified)
      return sendError(res, "This account is already verified!");

    const token = await VerificationToken.findOne({ owner: user._id });

    if (!token) return sendError(res, "Please, provide valide code !");

    const isMatched = await token.compareToken(otp);
    if (!isMatched) return sendError(res, "Please provide a valid code!");

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    res.status(200).json({
      message: "Your email is verified.",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        verified: user.verified,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return sendError(res, "Please provide a valid email");

    const user = await User.findOne({ email });

    if (!user) return sendError(res, "User not found, invalid request");

    const token = await ResetToken.findOne({ owner: user._id });
    if (token)
      return sendError(
        res,
        "Only after one hour you can request for another token"
      );

    const randomBytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
    await resetToken.save();

    mailTransport().sendMail({
      from: `Santchou Ghislain 🚀 <${config.user}>`,
      to: user.email,
      subject: "Password Reset",
      html: generatePasswordResetTemplate(
        `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
      ),
    });

    return res.status(202).json({
      success: true,
      message: "Password reset link is sent to your email.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  const schema = Joi.object({
    password: Joi.string().required().min(4).max(30).label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
  });
  const { error } = schema.validate({ password, confirmPassword });

  if (error) return res.status(404).json({ message: error.details[0].message });

  const id = req.user._id;

  try {
    const user = await User.findById(id);
    if (!user) return sendError(res, "User not found !");

    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword)
      return sendError(res, "New password must be different !");

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { login, signup, verifyEmail, forgotPassword, resetPassword };
