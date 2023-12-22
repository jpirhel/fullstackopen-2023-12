const _ = require("lodash");
const tokenExtractor = (req, res, next) => {
    const authorizationHeader = req.get("authorization");

    let addToken = true;

    if (_.isEmpty(authorizationHeader)) {
        addToken = false;
    }

    const prefix = "Bearer ";

    if (!authorizationHeader.startsWith(prefix)) {
        addToken = false;
    }

    if (addToken) {
        // noinspection UnnecessaryLocalVariableJS
        const token = authorizationHeader.replace(prefix, "");

        req.token = token;
    }

    next();
}

module.exports = {tokenExtractor};
