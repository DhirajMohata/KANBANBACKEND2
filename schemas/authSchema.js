const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
    role: z.enum(['manager', 'user', 'admin']),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

module.exports = {
    registerSchema,
    loginSchema,
};