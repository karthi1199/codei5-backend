const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        access_level: {
            type: String,
            required: true
        },
        defined_by: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model('Role', roleSchema);
