const bcrypt = require("bcryptjs");

const logger = require("../utils/logger");

const User = require("../models/user");

const usersRouter = require("express").Router();

usersRouter.post("/", async (request, response) => {
    let username;
    let name;
    let password;

    try {
        username  = request.body.username;
        name = request.body.name;
        password = request.body.password;
    } catch (e) {
        return response.status(400).end();
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({username, name, password: passwordHash});

    await user.save();

    return response.status(200).end();
});

usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    return response.json(users);
});

module.exports = usersRouter;
