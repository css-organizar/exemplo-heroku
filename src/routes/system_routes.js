const express = require('express');
const SystemRouter = express.Router();
const SystemController = require('../controllers/system_controller');

SystemRouter.get(
    '/v1/applicationtoken',
    SystemController.getApplicationToken
);

module.exports = SystemRouter;