/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
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