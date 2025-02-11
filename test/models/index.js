const userTable = require("./user.model");

async function syncDBinOrder() {
  await userTable.sync();
}

module.exports = {
  syncDBinOrder,
  userTable,
};
