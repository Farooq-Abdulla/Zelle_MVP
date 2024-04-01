require("dotenv").config();
const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { hash, compareSync } = require("bcrypt");

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const signupDetails = req.body;
  const parsedDetails = signupBody.safeParse(signupDetails);
  if (!parsedDetails.success) {
    return res.status(401).json({
      message: "Email already taken / Incorrect Inputs",
    });
  }
  const existingUser = await User.findOne({ username: signupDetails.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect Inputs",
    });
  }
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: await hash(req.body.password, 10),
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
    expiresIn: 3600,
  });
  res.json({
    message: "user created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const parsedData = signinBody.safeParse(req.body);
    if (!parsedData) {
      return res.status(401).json({
        message: "Incorrect Inputs",
      });
    }
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).json({
        message: "wrong Username",
      });
    }
    const payload = { userId: user._id };
    if (compareSync(req.body.password, user.password)) {
      const token1 = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: 3600,
      });
      return res.json({
        token: token1,
      });
    } else {
      return res.status(401).json({
        message: "wrong Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const parsedBody = updateBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(401).json({
      message: "Error while updating Information",
    });
  }
  let { firstName, lastName, password } = req.body;
  if (password) {
    newPassword = await hash(req.body.password, 10);
  }
  req.body.password = newPassword;
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const regexFilter = new RegExp(filter, "i"); // "i" flag for case-insensitive matching
  const users = await User.find({
    $or: [
      { firstName: { $regex: regexFilter } },
      { lastName: { $regex: regexFilter } },
    ],
  });
  filteredUsers = users.filter(
    (item) => item._id.toString() !== req.userId.toString()
  );
  res.json({
    user: filteredUsers.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
