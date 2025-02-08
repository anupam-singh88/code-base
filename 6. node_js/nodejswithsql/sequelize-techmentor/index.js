const express = require('express');
const app = express();
require('./models')
const User = require('./models/user')
const Contact = require('./models/contact');


const { connectDB } = require('./models/index');
const { addUser, updateUser, deleteUser,
    getUsers, query,
    getUser, ontToOne, ontToMany, manyToMany } = require('./controller/user.controller');
connectDB();

// User.sync().then(() => {
//     console.log('User table created');
//     // Table created
//     return User.create({
//         // firstName: '',
//         lastName: 'Hancock'
//     });
// });
// User.drop()

//sync all model at once
// sequelize.sync().then(() => {
//     console.log('All tables created');
//     // Table created
//     // return User.create({
//     //     // firstName: '',
//     //     lastName: 'Hancock'
//     // });
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', addUser);
app.post('/addUser', addUser);
app.put('/updateUser/:id', updateUser);
app.delete('/deleteUser/:id', deleteUser);
app.get('/getUsers', getUsers);
app.get('/getUser/:id', getUser);

app.get('/query', query);

app.get('/one-to-one', ontToOne)
app.get('/one-to-many', ontToMany)
app.get('/many-to-many', manyToMany)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);