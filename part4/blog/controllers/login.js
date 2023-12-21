const _ = require("lodash");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginRouter = require("express").Router();

const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
    const {username, password} = request.body;

    const invalidErrorMessage = "Invalid username or password";

    if (_.isEmpty(username) || _.isEmpty(password)) {
        return response.status(401).json({error: invalidErrorMessage});
    }

    const user = await User.findOne({username});

    if (_.isEmpty(user)) {
        return response.status(401).json({error: invalidErrorMessage});
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (! passwordIsCorrect) {
        return response.status(401).json({error: invalidErrorMessage});
    }

    const tokenUser = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(tokenUser, process.env.SECRET);

    return response
        .status(200)
        .send({token, username: user.username, name: user.name});
})

module.exports = loginRouter;
