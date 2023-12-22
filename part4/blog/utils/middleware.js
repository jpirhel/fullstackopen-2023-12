const _ = require("lodash");
const tokenExtractor = (req, res, next) => {
    const header = req.get("authorization");

    let addToken = true;

    if (_.isEmpty(header) || !header.startsWith(prefix)) {
        addToken = false;
    }

    const prefix = "Bearer ";

    if (addToken) {
        // noinspection UnnecessaryLocalVariableJS
        const token = header.replace(prefix, "");

        req.token = token;
    }

    next();
}

module.exports = {tokenExtractor};
