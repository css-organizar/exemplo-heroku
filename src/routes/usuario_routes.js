const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
const UserRoutes = express.Router();

const jwtUtils = require('../commons/twj_utils');
const UsuarioController = require('../controllers/usuario_controller');

UserRoutes.post('/usuario', jwtUtils.verifyJWT, UsuarioController.create);
UserRoutes.get('/usuario', jwtUtils.verifyJWT, UsuarioController.getAll);
UserRoutes.get('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.getById);
UserRoutes.delete('/usuario/:id', jwtUtils.verifyJWT, UsuarioController.delete);

module.exports = UserRoutes;