require('./config/config');
require('./database');

const socketIO = require('socket.io');
const http = require('http');

const express = require('express')
const app = express()

const cors = require('cors');
app.use(cors({ origin: true, credentials: true } ));

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


let server = http.createServer(app);
module.exports.io = socketIO(server);

require('./sockets/socket');

app.use('/api', require(__dirname +'/routes/index'));
 
server.listen(process.env.PORT, () => {
    console.log('Listen on port:', process.env.PORT)
});
