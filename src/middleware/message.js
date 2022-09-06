const dbConnected = 'Connected to MongoDB...';
const dbNotConnected = 'Not connected to MongoDB...';
const welcome = 'Welcome to the blogging-app...';
const signupSuccess = 'User signup successfully....';
const passwordNotMatch = 'Password and confirm password does not match....';
const invalidEmailPassword = 'Invalid email or password. Please try again...';
const noBlog = 'No Blogs Yet.';
const noTitle = 'No blog found with selected title.';
const noTag = 'No blog found with selected tags.'
const invalidInput = 'Invalid input. Please search by "UserId", "Title", or "Tags".';
const addBlogSuccess = 'Blog posted successfully.';
const addCommentRejected1 = 'Comment required..';
const addCommentRejected2 = 'No Blog with provided blog id.'
const addCommentSuccess = 'Comment added successfully';
const editBlogSuccess = 'Blog edit successfully.';
const editBlogRejected = 'Only author of blog is allowed to edit the blog.';



module.exports = {
    dbConnected,
    dbNotConnected,
    welcome,
    signupSuccess,
    passwordNotMatch,
    invalidEmailPassword,
    noBlog,
    noTitle,
    noTag,
    invalidInput,
    addBlogSuccess,
    addCommentRejected1,
    addCommentRejected2,
    addCommentSuccess,
    editBlogSuccess,
    editBlogRejected
};