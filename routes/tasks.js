const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TC');

router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
