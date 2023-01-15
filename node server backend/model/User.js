// Import mongoose
const mongoose = require("mongoose");

// Create schema
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    country: String });

module.exports = mongoose.model('User', userSchema);