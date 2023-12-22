const _ = require("lodash");

const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
    const header = req.get("authorization");

    let addToken = true;

    const prefix = "Bearer ";

    if (_.isEmpty(header) || !header.startsWith(prefix)) {
        addToken = false;
    }

    if (addToken) {
        // noinspection UnnecessaryLocalVariableJS
        const token = header.replace(prefix, "");

        req.token = token;
    }

    return next();
}

const userExtractor = (req, res, next) => {
    if (! req.token) {
        return next();
    }

    let data;

    try {
        data = jwt.decode(req.token, process.env.SECRET);
    } catch (e) {
        return next();
    }

    if (! _.isEmpty(data)) {
        req.user = data;
    }

    return next();
}

module.exports = {tokenExtractor, userExtractor};
