const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


usersRouter.get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});


usersRouter.get("/myAccount", async (req, res, next) => {
    try {
        /* Parse user information from the token. */
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }

        const response =  await User.findById(decodedToken.id);
        res.status(200).json(response);
    } catch(e) {
        next(e);
    }
});


usersRouter.post("/", async (req, res, next) => {
    const body = req.body;
    if(!body.password || !body.username) {
        return  res.status(400).send({error: "missing username or password"});
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
    } catch(e) {
        next(e);
    }
});

usersRouter.put("/myAccount", async (req, res, next) => {
    try {
        /* Parse user information from the token. */
        const decodedToken = jwt.verify(req.token, config.SECRET);

        if(!decodedToken.id) {
            return res.status(401).json({ error: "missing or invalid token"});
        }
    
        const updatedUser = await User.findByIdAndUpdate(decodedToken.id, req.body, { new: true });
        res.json(updatedUser);
    } catch(e) {
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