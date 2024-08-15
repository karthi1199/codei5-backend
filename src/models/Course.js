const mongoose = require('mongoose');
const Schema = mongoose;

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        syllabus: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        fees: {
            type: Number,
            required: true,
        },
        trainer: [{
            type: Schema.Types.ObjectId, 
            ref: 'User',
        }],
        batch: [{
            type: Schema.Types.ObjectId, 
            ref: 'Batch',
        }],
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


module.exports = mongoose.model('Course', courseSchema);
