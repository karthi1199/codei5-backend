const mongoose = require('mongoose');
const Schema = mongoose;

const contactUstSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            required: true,
        },
        message: {
            type: String,
        },
        status: {
            type: Boolean,
            required: true,
        },
        remarks: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model('Contact', contactUstSchema);
