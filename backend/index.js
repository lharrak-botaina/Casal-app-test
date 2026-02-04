const express = require('express');
const app = express();

var path = require('path');
var dir = path.join(__dirname, 'public');

require('./startup/mongo')();
require('./startup/cors')(app);
require('./startup/config')();
require('./startup/cookie')(app);
require('./startup/static')(app, dir);
require('./startup/routes')(app);


const port = process.env.PORT || 3000 ;

app.listen(port, () => { console.log(`Listening on the port ${port} ...`) });