const { z } = require('zod');
const { use } = require('../routes/authRoutes');

const createProjectSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    manager: z.string().nonempty(),
    admin: z.string().nonempty(),
    teamMembers: z.array(z.string()).optional(),
});

module.exports = {
    createProjectSchema,
};