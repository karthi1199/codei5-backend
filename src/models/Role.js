const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        access_level: {
            type: String,
            required: true
        },
        defined_by: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model('Role', roleSchema);
