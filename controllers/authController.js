const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
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
        await user.save().catch(err => {
            res.status(400).json({error : 'Error saving user: ', err});
        });
        const token = generateToken(user);
        res.status(201).json({ email, role, token });
    } catch (err) {
        res.status(400).json({ error: err.errors });
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
        res.status(200).json({ email, role: user.role, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
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