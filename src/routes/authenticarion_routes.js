const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');

const jwtUtils = require('../commons/twj_utils');

const AuthenticationRoutes = express.Router();

const AuthenticationController = require('../controllers/uuthentication_controller');

AuthenticationRoutes.post('/login', AuthenticationController.authentication);
AuthenticationRoutes.get('/status', AuthenticationController.status);

module.exports = AuthenticationRoutes;