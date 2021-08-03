const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
const UserRoutes = express.Router();

const jwtUtils = require('../../src/commons/JwtUtils');
const UsuarioController = require('../../src/controllers/UsuarioController');

UserRoutes.post('/usuario', jwtUtils.verifyJWT, UsuarioController.create);
UserRoutes.get('/usuario', jwtUtils.verifyJWT, UsuarioController.get );
UserRoutes.get('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.getById );
UserRoutes.delete('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.delete );

module.exports = UserRoutes;