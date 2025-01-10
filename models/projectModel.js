const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectModel);