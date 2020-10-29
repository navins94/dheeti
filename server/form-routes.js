const express = require('express');

const formCtrl = require('./form-controller');

const router = express.Router();

router.post('/', formCtrl.saveForm);

module.exports = router;
