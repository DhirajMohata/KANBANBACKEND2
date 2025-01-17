const Task = require('../models/taskModel');
const userModel = require('../models/userModel');
const { createTaskSchema } = require('../schemas/taskSchema');

const createTask = async (req, res) => {
    try {
        const { title, status, project, description, priority, deadline, assigned_to, assigned_by, attatchment } = req.body;
        const assigned_by_id = await userModel.findOne({ email: assigned_by });
        
        const task = new Task({
            title: title,
            description: description,
            status: status,
            project: project,
            priority: priority,
            deadline: deadline,
            assigned_by: assigned_by_id._id,
            assigned_to: assigned_to,
        });
        
        
        task.logs.push({
            action: 'Task created',
            user: task.assigned_by,
        });
        console.log(task);
        await task.save();

        const { parentTaskId } = req.body;
        if (parentTaskId) {
            console.log(parentTaskId);
            const parentTask = await Task.findById(parentTaskId);
            parentTask.assigned_by = assigned_by_id._id;
            parentTask.subTasks.push(task._id);
            console.log(parentTask);
            parentTask.logs.push({
                action: `Added new subtask : ${title}`,
                user: assigned_by,
            });
            console.log(parentTask);
            await parentTask.save();

            console.log('Parent Task Updated');
        }
        
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
}

const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.body;
        const tasks = await Task.find({ project: projectId });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getTasksByUser = async (req, res) => {
    try {
        const { assigned_to } = req.body;
        const user = await userModel.findOne({ email: assigned_to });
        const tasks = await Task.find({ assigned_to: user._id });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const task = await Task.findById(taskId);
        task.status = status;
        task.logs.push({
            action: `Task status updated to : ${status}`,
            user: task.assigned_by,
        });
        await task.save();
        res.status(200).json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const editTask = async (req, res) => {
    try {
        const { taskId, title, description, status, priority, assigned_to } = req.body;
        console.log(req.body);
        const task = await Task.findById(taskId);
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
        task.assigned_to = assigned_to;

        task.logs.push({
            action: title + ' Task Edited',
            user: task.assigned_by,
        });

        console.log(task);
        await task.save();
        res.status(200).json(task);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const addComment = async (req, res) => {
    try {
        const { taskId, comment } = req.body;
        const task = await Task.findById(taskId);
        task.comments.push({
            comment: comment,
        });
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}



module.exports = {
    createTask,
    getTasksByProject,
    getTasksByUser,
    updateTask,
    editTask,
    deleteTask,
    addComment,
};