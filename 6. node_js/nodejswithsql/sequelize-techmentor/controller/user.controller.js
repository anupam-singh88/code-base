// const { query } = require('express');
const { Sequelize, Op } = require('sequelize');
var { db, sequelize } = require('../models');
var User = db.User;
var Contact = db.Contact;


var addUser = async (req, res) => {
    const jane = await User.create(
        {
            firstName: "Jane",
            lastName: "Doe"

        }
    )
    // const jane = User.build(
    //     {
    //         firstName: "Jane",
    //         lastName: "Doe"

    //     }
    // )
    // console.log(jane instanceof User); //true
    // console.log(jane.firstName); // jane
    // jane.save().then(() => {
    //     console.log("Jane saved")
    //     res.status(200).json({
    //         message: "User added successfully",
    //         data: jane
    //     })
    // })

    res.status(200).json({
        message: "User added successfully",
        data: jane
    })

}

//post a user
const postUsers = async () => {
    const postData = req.body;

    if (!postData) res.status(400).json({
        message: "Please provide data"
    })

    if (postData.length > 1) {
        // postData.forEach(async (user)=>{
        //     const jane = await User.create(user)
        // })
        const jane = await User.bulkCreate(postData)
        res.status(200).json({
            message: "User added successfully",
            data: jane
        })
    }
    const jane = await User.create(postData);
    res.status(200).json({
        message: "User added successfully",
        data: jane
    })
}

// update a user
const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    user.firstName = "Jane"
    user.lastName = "Doe"
    await user.save()
    res.status(200).json({
        message: "User updated successfully",
        data: user
    })
}


// delete a user
const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    await user.destroy()
    res.status(200).json({
        message: "User deleted successfully"
    })
}

// get all users
const getUsers = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json({
        message: "All users",
        data: users
    })
}

// get a user
const getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    res.status(200).json({
        message: "User found",
        data: user
    })
}

const query = (req, res) => {
    const { query } = req.query;
    User.findAll({
        where: {
            firstName: query
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            // include: ['id', 'firstName',]
        },
        // attributes: ['id', 'firstName',],

        order: [
            ['id', 'DESC']
        ],
        limit: 2
    }).then((data) => {
        res.status(200).json({
            message: "User found",
            data: data
        })
    }).
        catch((err) => {
            res.status(404).json({
                message: "User not found"
            })
        })

}

const ontToOne = async (req, res) => {
    // const data = await User.create({
    //     firstName: "Jane",
    //     lastName: "Doe"
    // })

    // if (data && data.id) {
    //     const contact = await data.createContact({
    //         permanendAddress: "Delhi",
    //         currentAddress: "Gurgaon",
    //         user_id: data.id
    //     })
    //     return res.status(200).json({
    //         message: "User added successfully",
    //         data: contact
    //     })
    // }

    const data = await Contact.findAll(
        {
            attributes: ['permanendAddress', 'currentAddress'],
            include: [
                {
                    model: db.User,
                    as: "userDetails",
                    attributes: ['firstName', 'lastName']
                }
            ],
            // where: {
            //     id: 1
            // }

        }
    );
    // const data = await User.findAll(
    //     {
    //         attributes: ['id', 'firstName', 'lastName'],
    //         include: [
    //             {
    //                 model: db.Contact,
    //                 as: "contactDetails",
    //                 attributes: ['permanendAddress', 'currentAddress']
    //             }
    //         ],
    //         // where: {
    //         //     id: 1
    //         // }

    //     }
    // );

    res.status(200).json({
        message: "User added successfully",
        data

    })
}

const ontToMany = async (rqe, res) => {

    // const data = await Contact.create({
    //     permanendAddress: "Delhi",
    //     currentAddress: "Gurgaon",
    //     user_id: 1
    // })

    // res.status(200).json({
    //     message: "User added successfully",
    //     data: data
    // })

    User.findAll({
        include: [
            {
                model: db.Contact,
                as: "contactDetails",
                attributes: ['permanendAddress', 'currentAddress']
            }
        ]
    }).then((data) => {
        res.status(200).json({
            message: "User found",
            data: data
        })
    }).
        catch((err) => {
            res.status(404).json({
                message: "User not found"
            })
        })

}

const manyToMany = async (req, res) => {

    // const data = await User.create({
    //     firstName: "Jane ",
    //     lastName: "Doe  "
    // })

    // if (data && data.id) {
    //     const contact = await Contact.create({
    //         permanendAddress: "Delhi 2",
    //         currentAddress: "Gurgaon 2",
    //         // user_id: data.id
    //     })
    // }

    const data = await Contact.findAll({
        include: [
            {
                model: db.User,
                // as: "userDetails",
                attributes: ['firstName', 'lastName']
            }
        ],
    })

    res.status(200).json({
        message: "User added successfully",
        data
    })
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getUser,
    query,
    ontToOne,
    ontToMany,
    manyToMany
}
