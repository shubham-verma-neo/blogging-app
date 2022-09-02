const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const { blogs, add_blog, add_comment, edit_blog} = require('../controllers/blog.controller');

router.get('/blogs', blogs);

router.post('/add-blog', verify, add_blog);

router.put('/add-comment', verify, add_comment);

router.put('/edit-blog', verify, edit_blog);

module.exports = router;
