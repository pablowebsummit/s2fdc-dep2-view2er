const express = require('express');
const http = require('http');
const path = require('path');
const api = require('./api');

const PORT = 3000;
const HOSTNAME = 'localhost';

const app = express();

app.use(express.static(path.join(__dirname,'../public')));
app.use('/api',api);

app.use((req,res,next) => {

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html>this is an express server</html>');
});

const server = http.createServer(app);

server.listen(PORT,HOSTNAME, () => {
    console.log('server running');
});