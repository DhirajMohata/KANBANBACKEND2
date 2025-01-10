const Task = require('../models/taskModel');
const { createTaskSchema } = require('../schemas/taskSchema');

const createTask = async (req, res) => {
    try {
        const { title, description, project, status, priority, assigned_to, assigned_by, attatchment } = createTaskSchema.parse(req.body);
        const task = new Task({
            title,
            description,
            status,
            project,
            priority,
            assigned_to,
            assigned_by,
            attatchment
        });
        task.logs.push({
            action: 'Task created',
            user: assigned_by,
        });

        await task.save();


        const { parentTaskId } = req.body;
        console.log(parentTaskId);
        if (parentTaskId) {
            console.log(parentTaskId);
            const parentTask = await Task.findById(parentTaskId);

            parentTask.subTasks.push(task._id);

            console.log(parentTaskId);

            task.logs.push({
                action: 'Its a subtask for task : ' + parentTask.title,
                user: assigned_by,
            });

            await task.save();
            
        console.log(parentTaskId);
            parentTask.logs.push({
                action: `Added new subtask : ${title}`,
                user: assigned_by,
            });
            await parentTask.save();

        console.log(parentTaskId);
        }

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
}

const getTasksByProject = async (req, res) => {
    try {
        const { project } = req.body;
        const tasks = await Task.find({ project });
        
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getTasksByUser = async (req, res) => {
    try {
        const { assigned_to } = req.body;
        const tasks = await Task.find({ assigned_to });
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
        const { taskId, title, description, status, priority, attatchment } = req.body;
        const task = await Task.findById(taskId);
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.attatchment = attatchment;
        task.status = status;
        task.logs.push({
            action: 'Task updated',
            user: task.assigned_by,
        });
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
        const task = await Task.findById(taskId);
        await task.delete();
        res.status(200).json({ message: 'Task deleted successfully' });
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
};