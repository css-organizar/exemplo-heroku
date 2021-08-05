const express = require('express');
const AuthenticationRoutes = express.Router();
const AuthenticationController = require('../controllers/authentication_controller');

AuthenticationRoutes.post(
    '/v1/login',
    AuthenticationController.authentication
);

AuthenticationRoutes.get(
    '/v1/status',
    AuthenticationController.status
);

module.exports = AuthenticationRoutes;