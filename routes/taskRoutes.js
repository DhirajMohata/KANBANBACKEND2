const express  = require('express');
const { createTask, getTasksByProject, getTasksByUser, updateTask, editTask, deleteTask} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/create', authMiddleware(['manager']), createTask);
router.post('/project', authMiddleware(['admin', 'manager']), getTasksByProject);
router.post('/user', authMiddleware(['admin', 'manager', 'user']), getTasksByUser);
router.put('/update', authMiddleware(['manager', 'user']), updateTask);
router.put('/edit', authMiddleware(['manager']), editTask);
router.delete('/delete', authMiddleware(['manager']), deleteTask);

module.exports = router;
