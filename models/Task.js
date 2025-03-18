const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    comments: {
        type: String
    }
});

module.exports = mongoose.model('Task', TaskSchema);
