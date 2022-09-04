const jwt = require("jsonwebtoken");
// const { decode } = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedToken;

    if (token && isCustomAuth) {
      decodedToken = jwt.verify(token, process.env.SECRET);
      req.userId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(token, process.env.SECRET);
      req.userId = decodedToken.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
