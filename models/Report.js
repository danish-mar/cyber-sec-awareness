const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        default: 'Anonymous'
    },
    issue: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Investigating', 'Resolved', 'Dismissed'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Report', ReportSchema);
