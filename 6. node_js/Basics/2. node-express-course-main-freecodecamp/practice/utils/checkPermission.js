const { CreateUnauthorizedError } = require("../errors");

const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') {
        return true;
    }

    if (requestUser.userId === resourceUserId.toString()) {
        return true;
    }

    throw CreateUnauthorizedError("Permission Denied");
}

module.exports = checkPermission;