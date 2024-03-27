

const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.send("log in first");
  } else {
    jwt.verify(token, "green", function (err, decode) {
      if (err) {
        res.send("login first");
      } else {
        const { userID } = decode;
        req.userID = userID;
        next();
      }
    });
  }
};

module.exports = authentication;