const express = require('express');
const app = express();

require('./startup/mongoDB')();
require('./startup/routes')(app, express);

const port = 8000;
app.listen(port, () => {
    console.log(`Connected to port ${port}...`);
});