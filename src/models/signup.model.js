const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true},
    password: String
}, {
    timestamp: true
});

const Users = mongoose.model('user', signupSchema);

module.exports = { Users, signupSchema };