const mongoose = require('mongoose');
const Schema = mongoose;

const BatchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        from_batch_time: {
            type: Date,
            required: true
        },
        to_batch_time: {
            type: Date,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = mongoose.model('Batch', BatchSchema);
