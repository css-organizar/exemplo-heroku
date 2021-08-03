const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');

const jwtUtils = require('../commons/jwtUtils');

const AuthenticationRoutes = express.Router();

const AuthenticationController = require('../controllers/AuthenticationController');

AuthenticationRoutes.post('/login', AuthenticationController.authentication);
AuthenticationRoutes.get('/status', AuthenticationController.status);

module.exports = AuthenticationRoutes;