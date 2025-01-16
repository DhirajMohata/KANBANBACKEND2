const { get } = require('mongoose');
const Project = require('../models/projectModel');
const userModel = require('../models/userModel');

const { createProjectSchema } = require('../schemas/projectSchema');
const projectModel = require('../models/projectModel');

const createProject = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, manager, admin, teamMembers} = createProjectSchema.parse(req.body);
        const project = new Project({
            name,
            description,
            manager,
            admin,
            teamMembers,
        });
        const adminUser = await userModel.findOne({ email: admin });
        project.admin = adminUser._id;
        console.log(project);
        await project.save();
        console.log(project);
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
}

const getProjectsByAdmin = async (req, res) => {
    
    try {
        console.log(req.body);
        const email  = req.body.email;
        const user = await userModel.findOne({ email: email });
        const projects = await Project.find({ admin : user._id });
        console.log(projects);
        res.status(200).json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'user' });
        const userNamesAndIds = users.map(user => ({ id: user._id, name: user.name, email: user.email }));
        res.status(200).json(userNamesAndIds);
    } catch (err) {
        console.log(err);
    }
}

const getManagers = async (req, res) => {
    try {
        const managers = await userModel.find({ role: 'manager' });
        const availableManagers = [];

        for (const manager of managers) {
            const project = await Project.findOne({ manager: manager._id });
            if (!project) {
                availableManagers.push({ id: manager._id, name: manager.name, email: manager.email });
            }
        }
        res.status(200).json(availableManagers);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

const getProjectTeamMeambers = async (req, res) => {
    try {
        const { projectId } = req.body;
        
        const project = await projectModel.findById(projectId);

        return project.teamMembers;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createProject,
    getProjectsByAdmin,
    getUsers,
    getManagers,
    getProjectTeamMeambers
};