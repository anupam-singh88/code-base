const User = require('./user');

async function syncDbINOrder() {
    try {
        await User.sync()
    } catch (error) {
        console.log("Error Syncing models: ", error)
    }
}

module.exports = { syncDbINOrder }