const jwt = require('jsonwebtoken');

function authMiddleware (roles) {
    return (req, res, next) => {
        const token = req.headers.authorization;
        console.log(token);
        
        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            if(!decoded || (roles.length && !roles.includes(decoded.role))) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}

module.exports = authMiddleware;