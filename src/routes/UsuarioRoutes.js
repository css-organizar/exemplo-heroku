const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');

const jwtUtils = require('../commons/jwtUtils');

const UserRoutes = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

UserRoutes.post('/usuario', jwtUtils.verifyJWT, UsuarioController.create);
UserRoutes.get('/usuario', jwtUtils.verifyJWT, UsuarioController.get );
UserRoutes.get('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.getById );
UserRoutes.delete('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.delete );

module.exports = UserRoutes;