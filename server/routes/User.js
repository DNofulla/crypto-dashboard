const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

router.get("/", async (req, res) => {
  res
    .status(400)
    .json({ message: "INVALID ENDPOINT! DO NOT use this endpoint!" });
});

router.get("/all", async (req, res) => {
  const users = User.find();

  res.status(200).json({ users: users });
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res
        .status(400)
        .json({ message: "No username sent!", exists: false });
    }

    const user = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "No account with this username exists!",
        exists: false,
      });
    } else {
      return res.status(200).json({
        exists: true,
        user: {
          username: user.username,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  let session = req.session;
  return res.status(200).send(session);
});

router.post("/register", async (req, res) => {
  try {
    let reqUser = req.body;
    if (
      !reqUser.firstName ||
      !reqUser.lastName ||
      !reqUser.username ||
      !reqUser.email ||
      !reqUser.password
    ) {
      return res.status(400).json({ message: "Empty Fields!" });
    }

    const userExistsUsername = await User.findOne({
      username: reqUser.username.toLowerCase(),
    });

    const userExistsemail = await User.findOne({
      email: reqUser.email,
    });

    if (userExistsUsername) {
      return res
        .status(400)
        .json({ message: "Account with this username already exists." });
    }

    if (userExistsemail) {
      return res
        .status(400)
        .json({ message: "Account with this email already exists." });
    }

    const bcryptSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(reqUser.password, bcryptSalt);

    const newUser = new User({
      username: reqUser.username.toLowerCase(),
      password: hashedPassword,
      email: reqUser.email,
      verified: false,
      joinedAt: new Date(),
    });
    await newUser.save();
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: "User not authenticated" });
  }

  if (!req.user) {
    return res.status(403).json({ message: "User not found!" });
  }

  res.status(200).json(req.user);
});

// Logging out and destroying session: localhost:8080/users/logout
router.post("/logout", async (req, res) => {
  req.logout();

  res.clearCookie("connect.sid");
  return res.status(200).json({
    message: `User Session has been destroyed!`,
  });
});

module.exports = router;
