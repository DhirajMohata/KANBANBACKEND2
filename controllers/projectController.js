const Project = require('../models/projectModel');
const { createProjectSchema } = require('../schemas/projectSchema');

const createProject = async (req, res) => {
    try {
        const { name, description, manager, admin, teamMembers} = createProjectSchema.parse(req.body);
        const project = new Project({
            name,
            description,
            manager,
            admin,
            teamMembers,
        });
        await project.save();
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
}

const getProjectsByAdmin = async (req, res) => {
    try {
        const { admin } = req.body;
        const projects = await Project.find({ admin });
        res.status(200).json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    createProject,
    getProjectsByAdmin,
};