const express = require('express');

const router = express.Router();

const form = require('../../controllers/client/ClientForm');

router.get('/client-register', form.clientRegister)

router.post('/client-register', form.clientPostRegister)

router.get('/client-login', form.clientLoginForm)

router.post('/client-login', form.clientPostLogin)

module.exports = router