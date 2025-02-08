const { CustomAPIError, createCustomApiError } = require("./custom-api");
const { NotFoundError, createNotFoundError } = require("./not-found");
const { UnauthorizedError, CreateUnauthorizedError } = require("./unauthorized");
const { UnauthenticatedErr, createUnauthenicatedErr } = require("./unauthenticated");
const { BadRequestError, createBadRequestError } = require("./bad-request");

module.exports = {
    CustomAPIError, createCustomApiError,
    UnauthorizedError, CreateUnauthorizedError,
    NotFoundError, createNotFoundError,
    UnauthenticatedErr, createUnauthenicatedErr,
    BadRequestError, createBadRequestError
}