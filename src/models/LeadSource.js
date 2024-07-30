const mongoose = require('mongoose');

const leadSourceSchema = new mongoose.Schema(
    {
        lead_from: {
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


module.exports = mongoose.model('LeadSource', leadSourceSchema);
