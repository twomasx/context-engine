const express = require('express');
const router = express.Router();
const { ContextController } = require('../controllers');

// Context Routes
router.get('/contexts', ContextController.readAll);
router.get('/contexts/:id', ContextController.read);
router.post('/contexts', ContextController.create);
router.put('/contexts/:id', ContextController.update);
router.delete('/contexts/:id', ContextController.delete);

module.exports = router;