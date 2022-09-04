const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 300,
  },
  verified: {
    type: Boolean,
    default: false,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, 8);
//   next();
// });

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
