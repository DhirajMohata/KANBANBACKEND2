const mongoose = require('mongoose');
const { string } = require('zod');

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    priority: {
        type: String,
    },
    status: {
        type: String,
    },
    deadline: {
        type: String,
        required: false,
    },
    logs: [{
        action: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    }],
    attatchment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments : [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        default: [],
    }],
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
    }],
});

module.exports = mongoose.model('Task', taskModel);