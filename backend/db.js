require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxLength: 40,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 40,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 4,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Account };
