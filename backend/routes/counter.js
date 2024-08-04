const express = require('express');
const { getCounter, incrementCounter } = require('../controllers/counterController');

const router = express.Router();

router.get('/', getCounter);
router.post('/increment', incrementCounter);

module.exports = router;
