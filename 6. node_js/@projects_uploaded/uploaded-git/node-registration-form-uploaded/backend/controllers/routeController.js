const RegistrationModel = require('../models/RegistrationModel')

const baseURL = async (req, res) => {
    try {
        const { firstName, userName, userEmail, phoneNumber, passwordVal, genderValue } = req.body;
        console.log(firstName, userName, userEmail, phoneNumber, passwordVal, genderValue);

        const data = new RegistrationModel({
            firstName, userName, userEmail, phoneNumber, passwordVal, genderValue
        })
        const saveToDb = await data.save();
        res.json(saveToDb);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }

}

module.exports = { baseURL }