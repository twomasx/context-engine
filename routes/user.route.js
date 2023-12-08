const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

// User Routes
router.get('/users', UserController.readAll);
router.get('/users/:id', UserController.read);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;