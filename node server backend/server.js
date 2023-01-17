require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const corsOptions = require('./config/corsOptions');
const connectDB = require("./config/dbConn");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

// settings
mongoose.set('strictQuery', true);
var jsonParser = bodyParser.json();
app.use(cors(corsOptions));

// Connect MongoDB
connectDB();

// routes
app.use('/register', jsonParser, require('./routes/register'));
app.use('/login', jsonParser, require('./routes/login'), function(req, res) {
    // do something
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
 });

// check the connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB! ')
    app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)});
});