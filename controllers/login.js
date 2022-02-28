/** Module defines API endpoints that control user login. */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

/** POST endpoint that ensures that the username and password are correct. */

loginRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  // Use bcrypt to compare provided password the password hash that was retreived from the database
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

  // If either the given username or password was invalid, return 401
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // Create jwt token and send it to the user
  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({
    id: user._id,
    token
  });
});

module.exports = loginRouter;
