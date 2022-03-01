/** Module defines API endpoints that control users. */

const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const middleware = require("../utils/middleware");

/** GET endpoint to fetch all users. */

usersRouter.get("/", async (req, res) => {
  const users = await User.find({})
    .populate("chat.receiver", "username id")
    .populate("chat.messages.sender", "username id");
  res.status(200).json(users);
});

/** GET endpoint to fetch user based on token. */

usersRouter.get("/myAccount", middleware.userExtractor, async (req, res, next) => {
  const user = req.user;
  try {
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

/** POST endpoint to save new user. */

usersRouter.post("/", async (req, res, next) => {
  const body = req.body;
  if (!body.password || !body.username) {
    return res.status(400).send({ error: "missing username or password" });
  }

  // Apply salting to the hashing process
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    passwordHash: passwordHash,
    chat: []
  });

  try {
    const response = await user.save();
    res.json(response);
  } catch (e) {
    next(e);
  }
});

/** PUT endpoint to edit user information. */

usersRouter.put("/myAccount", middleware.userExtractor, async (req, res, next) => {
  const id = req.userId;

  if (req.body.password) {
    const saltRounds = 10;
    req.body.passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(400).send({ error: "user update unsuccessful" });
    }

    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
