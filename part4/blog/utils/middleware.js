const _ = require("lodash");
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

    next();
}

module.exports = {tokenExtractor};
