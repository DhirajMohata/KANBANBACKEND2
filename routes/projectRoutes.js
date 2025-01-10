const express = require('express');
const { createProject, getProjectsByAdmin } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/create', authMiddleware(['admin']), createProject);
router.post('/', authMiddleware(['admin']), getProjectsByAdmin);

module.exports = router;