const mongoose = require('mongoose');

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
        enum: ["low", "medium", "high"],
        type: String,
        default: "low",
    },
    status: {
        type: String,
        default: 'todo',
        enum: ['todo', 'inprogress', 'done'],
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
    subTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
    }],
});

module.exports = mongoose.model('Task', taskModel);