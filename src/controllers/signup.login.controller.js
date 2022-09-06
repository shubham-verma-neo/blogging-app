const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/signup.model');
const {signupSuccess,passwordNotMatch,invalidEmailPassword} = require('../middleware/message');


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
            .then(() => res.send(signupSuccess))
            .catch(error => res.status(400).send(error.message));
    }
    else {
        const error = new Error(passwordNotMatch);
        // console.log(error.message);
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

    if (!user || !await bcrypt.compare(req.query.password, user.password)) {
        // const error = new Error('Invalid email or password. Please try again...');
        return res.status(401).send(invalidEmailPassword);
        // throw error;
    }
    const token = jwt.sign({ _id: user._id }, 'neosoft');
    return res.header('auth-token', token).send(token);
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { signup, login }