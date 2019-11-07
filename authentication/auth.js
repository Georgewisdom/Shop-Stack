const jwt = require("jsonwebtoken");
const config = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, config.JWT_SECRET);
    req.userData = decoded;
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  next();
};
