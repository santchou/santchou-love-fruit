const { randomBytes } = require("crypto");

module.exports.sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, message: error });
};

module.exports.createRandomBytes = () =>
  new Promise((resolve, reject) => {
    randomBytes(256, (err, buf) => {
      if (err) return reject(err);
      const token = buf.toString("hex");
      resolve(token);
    });
  });
