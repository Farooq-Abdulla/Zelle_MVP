require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Invalid Bearer token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token, process.env.JWT_TOKEN);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ "wrong userId": decoded.userId });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "In catch block", error: error.message });
  }
}

module.exports = { authMiddleware };
