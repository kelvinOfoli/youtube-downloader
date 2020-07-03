const http = require('http');
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const covertRoutes = require('./routes/convert');
const notFoundRoute = require('./routes/404');

const app = express();

//Middlewares
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use(aboutRoutes);
app.use(covertRoutes)
app.use(homeRoutes);

//404 Route
app.use(notFoundRoute);

const server = http.createServer(app);
server.listen(3000); 