const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access Denied.');
    try {
        const verified = jwt.verify(token, 'neosoft');
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).send('Invalid Token.');
    }
}