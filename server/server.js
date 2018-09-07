//Main server for app

//Module imports
//Import index.js for main router
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

let app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../client'));

app.use('/api', apiRoutes);

app.listen(3000);