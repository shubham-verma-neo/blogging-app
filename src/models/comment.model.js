const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxLength: 100
    }
}, {
    timestamp: true
});

const Comments = mongoose.model('comment', commentSchema);

module.exports = { Comments, commentSchema };