const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}
const verifyToken = (token) => {
    token = token.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
}
module.exports = {
    generateToken,
    verifyToken,
};