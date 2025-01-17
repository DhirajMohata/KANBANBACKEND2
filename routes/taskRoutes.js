const express  = require('express');
const { createTask, getTasksByProject, getTasksByUser, updateTask, editTask, deleteTask, addComment} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/create', createTask);
router.post('/project', getTasksByProject);
router.post('/user', getTasksByUser);
router.put('/update',  updateTask);
router.put('/edit',  editTask);
router.put('/delete', deleteTask);
router.post('/comment', addComment);
module.exports = router;
