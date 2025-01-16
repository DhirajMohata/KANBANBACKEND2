const express = require('express');
const { createProject, getProjectsByAdmin, getUsers, getManagers, getProjectTeamMeambers} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/create', createProject);
router.post('/', getProjectsByAdmin);
router.get('/users', getUsers);
router.get('/managers', getManagers);
router.post('/team', getProjectTeamMeambers);
module.exports = router;