const express = require('express');
const UsersController = require('../controllers/UsersController');
const TasksController = require('../controllers/TasksController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
// import registration from ('../controllers/UsersController');

const router = express.Router();




//All Routes
router.post('/registration', UsersController.registration);
router.post('/login', UsersController.login);
router.post('/profileUpdate', AuthVerifyMiddleware, UsersController.profileUpdate);

router.post('/createTask', AuthVerifyMiddleware, TasksController.createTask);
router.get('/updateTaskStatus/:id/:status', AuthVerifyMiddleware, TasksController.updateTaskStatus);
router.get('/taskListByStatus/:status', AuthVerifyMiddleware, TasksController.taskListByStatus);
router.get('/taskCountByStatus', AuthVerifyMiddleware, TasksController.taskCountByStatus);

module.exports = router;