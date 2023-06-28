const path = require('path');

const express = require('express');

const controller = require('../controllers/enterUser')

const router = express.Router();

router.get('/register-panel', controller.getRegister)

router.post('/register-panel', controller.postRegister)

router.get('/login', controller.getLogin)

router.post('/login', controller.postLogin)

module.exports = router;