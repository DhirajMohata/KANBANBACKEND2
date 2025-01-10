const { z } = require('zod');

const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    project: z.string().nonempty(),
    assigned_to: z.string().nonempty(),
    assigned_by: z.string().nonempty(),
});

module.exports = {
    createTaskSchema,
};