const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

resetTokenSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, salt);
  }
  next();
});

resetTokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

module.exports = ResetToken;
