const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/signup.model');

//------------------------------------------------------------------------------------------------------------------//

const signup = async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        async function createUser() {
            const user = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
            await user.save();
        }
        await createUser()
            .then(() => res.send('User signup successfully....'))
            .catch(error => res.status(400).send(error.message));
    }
    else {
        const error = new Error('Password and confirm password does not match....');
        console.log(error.message);
        return res.send(error.message);
    }
}

//------------------------------------------------------------------------------------------------------------------//

const login = async (req, res) => {
    let user;
    try {
        user = await Users
            .findOne({ email: req.query.email });
    }
    catch (error) {
        return res.send(error.message);
    }

    if (!user || !await bcrypt.compare(req.query.password, user.password))
        return res.status(400).send('Invalid email or password. Please try again...');

    const token = jwt.sign({ _id: user._id }, 'neosoft');
    return res.header('auth-token', token).send(token);
}

//------------------------------------------------------------------------------------------------------------------//

module.exports= { signup, login }