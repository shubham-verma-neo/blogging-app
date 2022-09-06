const { Comments, commentSchema } = require('../models/comment.model');
const { Blogs } = require('../models/blog.model');
const {
    noBlog,
    noTitle,
    noTag,
    invalidInput,
    addBlogSuccess,
    addCommentRejected1,
    addCommentRejected2,
    addCommentSuccess,
    editBlogSuccess,
    editBlogRejected } = require('../middleware/message');

//------------------------------------------------------------------------------------------------------------------//

const blogs = async (req, res) => {
    let blog;
    if (req.query.userId) {
        try {
            blog = await Blogs
                .find({ userId: req.query.userId })
                .populate('userId comments comments.userId ', 'firstName lastName -_id ');
            if (!blog[0])
                return res.status(400).send(noBlog);
            return res.send(blog);
        } catch (error) {
            return res.send(error.message)
        }
    }

    else if (req.query.title) {
        try {
            blog = await Blogs
                .find({ title: req.query.title })
                .populate('userId comments comments.userId ', 'firstName lastName -_id ');
            if (!blog[0])
                return res.status(400).send(noTitle);
            return res.send(blog);
        } catch (error) {
            return res.send(error.message)
        }
    }

    else if (req.query.tags) {
        try {
            blog = await Blogs
                .find({ tags: req.query.tags })
                .populate('userId comments comments.userId ', 'firstName lastName -_id ');
            if (!blog[0])
                return res.status(400).send(noTag);
            return res.send(blog);
        } catch (error) {
            return res.send(error.message)
        }
    }
    else {
        return res.status(400).send(invalidInput)
    }
}
//------------------------------------------------------------------------------------------------------------------//

const add_blog = async (req, res) => {
    let blog;
    try {
        blog = await new Blogs({
            userId: req.user._id,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags
        }).save();
        return res.send({ message: addBlogSuccess, blog: blog });
    }
    catch (error) {
        return res.send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

const add_comment = async (req, res) => {
    if (!req.query.id) {
        const error = new Error(addCommentRejected2);
        return res.status(400).send(error.message);
    }
    if (!req.body.comment) {
        const error = new Error(addCommentRejected1);
        return res.status(400).send(error.message);
    }
    let blog;
    try {
        blog = await Blogs
            .findById(req.query.id);
    } catch (error) {
        return res.send(error.message)
    }
    blog.comments.push(await new Comments({
        userId: req.user._id,
        comment: req.body.comment
    }));
    blog.save();
    return res.send(addCommentSuccess);
}

//------------------------------------------------------------------------------------------------------------------//

const edit_blog = async (req, res) => {
    let blog;
    try {
        blog = await Blogs
            .findById(req.query.id);
    } catch (error) {
        return res.send(error.message)
    }

    if (req.user._id == blog.userId) {
        if (req.body.body)
            blog.body = req.body.body;
        if (req.body.title)
            blog.title = req.body.title;
        if (req.body.tags)
            blog.tags = req.body.tags;
        blog.save();
        return res.send({message: editBlogSuccess ,blog:blog});
    } else {
        let error = new Error(editBlogRejected);
        return res.status(401).send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { blogs, add_blog, add_comment, edit_blog }