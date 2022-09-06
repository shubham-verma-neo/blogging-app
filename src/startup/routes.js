const signup = require('../routes/signup');
const login = require('../routes/login');
const blog = require('../routes/blog');
const { welcome } = require('../middleware/message');


module.exports = function (app, express) {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send(welcome);
    });

    app.use('/signup', signup);

    app.use('/login', login);
    
    app.use('/blog', blog);
}