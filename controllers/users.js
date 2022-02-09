const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.get("/myAccount", middleware.userExtractor, async (req, res, next) => {
  const user = req.user;

  try {
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const body = req.body;
  if (!body.password || !body.username) {
    return res.status(400).send({ error: "missing username or password" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    passwordHash: passwordHash
  });

  try {
    const response = await user.save();
    res.json(response);
  } catch (e) {
    next(e);
  }
});

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

/*
usersRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndRemove(id);
        res.status(204).json.end(); 
    } catch(e) {
        next(e);
    }
});
*/

module.exports = usersRouter;
