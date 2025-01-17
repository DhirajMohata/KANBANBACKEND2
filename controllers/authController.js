const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');
const { registerSchema, loginSchema } = require('../schemas/authSchema');
const { generateToken } = require('../utils/jwtUtils');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = registerSchema.parse(req.body);
        console.log(name);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(name);
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            role,
        });
        console.log(user);
        await user.save();
        var projectId = undefined;
        var teamMembers = [];
        if(user.role === 'manager') {
            const managerProject = await projectModel.findOne({ manager: user._id });
            projectId = managerProject._id;
            teamMembers = managerProject.teamMembers;
        }
        const token = generateToken(user);
        res.status(201).json({ email, role, projectId, teamMembers, token });
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await userModel
            .findOne({ email })
            
        if (!user) {
            res.status(404).json({ error: 'Invalid email or password' });
            return;
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = generateToken(user);

        
        var projectId = undefined;
        var teamMembers = [];

        if(user.role === 'manager') {
            const managerProject = await projectModel.findOne({ manager: user._id });
            projectId = managerProject._id;
            teamMembers = managerProject.teamMembers;

        }
        console.log(projectId);
        res.status(200).json({ email, role: user.role, projectId, teamMembers, token });
    }
    catch (err) {
        console.log(err);
    }
}

const logout = async (req, res) => {
    try {
        const token = null;
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    register,
    login,
    logout,
};