const { Comments, commentSchema } = require('../models/comment.model');
const { Blogs } = require('../models/blog.model');

//------------------------------------------------------------------------------------------------------------------//

const blogs = async (req, res) => {
    let blog;
    if (req.query.userId) {
        try {
            blog = await Blogs
                .find({ userId: req.query.userId })
                .populate('userId comments comments.userId ', 'firstName lastName -_id ');
            if (!blog[0])
                return res.status(400).send(`No Blogs Yet.`);
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
                return res.status(400).send(`No blog found with title "${req.query.title}".`);
            return res.send(blog);
        } catch (error) {
            return res.send(error.message)
        }
    }

    else if (req.query.tag) {
        try {
            blog = await Blogs
                .find({ tags: req.query.tag })
                .populate('userId comments comments.userId ', 'firstName lastName -_id ');
            if (!blog[0])
                return res.status(400).send(`No blog found with the tag "${req.query.tag}".`);
            return res.send(blog);
        } catch (error) {
            return res.send(error.message)
        }
    }
    else {
        return res.status(400).send('Invalid input. Please search by "UserId", "Title", or "Tags".')
    }
}
//------------------------------------------------------------------------------------------------------------------//

const add_blog = async (req, res) => {
    let blog;
    try {
        blog = await new Blogs({
            userId: req.body.userId,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags
        }).save();
        return res.send(blog);
    }
    catch (error) {
        return res.send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

const add_comment = async (req, res) => {
    if (!req.body.comment || !req.body.userId) {
        const error = new Error('UserId and Comment required..');
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
        userId: req.body.userId,
        comment: req.body.comment
    }));
    blog.save();
    return res.send('Comment added successfully');
}

//------------------------------------------------------------------------------------------------------------------//

const edit_blog = async (req, res) => {
    let blog;
    try {
        blog = await Blogs
            .findById(req.query._id);
    } catch (error) {
        return res.send(error.message)
    }

    if (req.query.userId && req.query.userId == blog.userId) {
        if (req.body.body)
            blog.body = req.body.body;
        if (req.body.title)
            blog.title = req.body.title;
        if (req.body.tags)
            blog.tags = req.body.tags;
        blog.save();
        return res.send(blog);
    } else {
        let error = new Error('Only author of blog is allowed to edit the blog.');
        return res.status(401).send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { blogs, add_blog, add_comment, edit_blog }