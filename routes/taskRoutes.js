const express  = require('express');
const { createTask, getTasksByProject, getTasksByUser, updateTask, editTask, deleteTask} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/create', createTask);
router.post('/project', getTasksByProject);
router.post('/user', getTasksByUser);
router.put('/update',  updateTask);
router.put('/edit',  editTask);
router.delete('/delete', deleteTask);

module.exports = router;
