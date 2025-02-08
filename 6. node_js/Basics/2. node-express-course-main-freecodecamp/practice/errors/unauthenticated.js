const { CustomAPIError } = require("./custom-api");

class UnauthenticatedErr extends CustomAPIError {
    constructor(message, statusCode = 401) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createUnauthenicatedErr = (msg, statusCode) => {
    return new UnauthenticatedErr(msg, statusCode);
}

module.exports = { UnauthenticatedErr, createUnauthenicatedErr }