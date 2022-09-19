const mongoose = require('mongoose');

const videoContentSchema = new mongoose.Schema({
    creatorID: { 
        type: mongoose.SchemaTypes.ObjectId 
    },
    contentTitle: {
        type: String,
        required:[true],
        trim:true
    },
    genre: {
        type: String,
        required: [true],
        trim:true
    },
    type: {
        type: String,
        trim:true,
        required: [true],
    },
    releaseDate: {
        type: String,
        required: [true],
        trim:true
    },
    language:{
        type: String,
        required: [true, "laguage is required"],
        trim:true,
    },
}, { timestamps:true})


const videoContent = mongoose.model("videoContent", videoContentSchema);


module.exports = { videoContent };