require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const { User } = require("../db");

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid Bearer token" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    if (decodedToken.userId) {
      const user = await User.findOne({ _id: decodedToken.userId });
      if (user) {
        res.status(200).json({ user: user });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
