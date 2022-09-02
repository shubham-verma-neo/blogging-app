const mongoose = require('mongoose');
const { Users, signupSchema } = require('./signup.model');
const { Comments, commentSchema } = require('./comment.model');

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
        mainLength: 5,
        maxLength: 50
    },
    body: {
        type: String,
        required: true,
        mainLength: 10,
        maxLength: 255
    },
    tags: [String],
    comments: {
        type: [commentSchema]
    }
})

const Blogs = mongoose.model('blog', blogSchema);

module.exports = { Blogs };
