const mongoose = require('mongoose');
const { dbConnected, dbNotConnected } = require('../middleware/message');

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/blogging-app')
        .then(() => console.log(dbConnected))
        .catch(err => console.error(dbNotConnected, err));
}