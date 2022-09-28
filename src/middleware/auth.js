const jwt = require("jsonwebtoken");

const {User} = require("../database.js")

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    // console.log(decoded)
    const user = await User.findOne({where:{email:decoded.email}})
    // console.log(user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;