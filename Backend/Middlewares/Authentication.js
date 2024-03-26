

const jwt = require("jsonwebtoken");
//......................authentication at here......................................

// export const authentication = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     res.send("log in first");
//   } else {
//     jwt.verify(token, "kuntal", function (err, decode) {
//       if (err) {
//         res.send("login first");
//       } else {
//         const { userID } = decode;
//         req.userID = userID;
//         next();
//       }
//     });
//   }
// };

//......................authentication at here......................................

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.send("log in first");
  } else {
    jwt.verify(token, "kuntal", function (err, decode) {
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