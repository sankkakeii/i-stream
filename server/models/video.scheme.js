const mongoose = require('mongoose');
// const { Schema } = mongoose

const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const contentSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "email is required"],
        trim:true
    },
    businessName: {
        type: String,
        // unique: true,
        trim:true
    },
    businessAddress: {
        type: String,
        trim:true
    },
    phone: {
        type: String,
        // unique: true,
        trim:true
    },
    password:{
        type: String,
        required: [true, "password is required"],
        trim:true,
    },
}, { timestamps:true})


const content = mongoose.model("content", contentSchema);


module.exports = { content };