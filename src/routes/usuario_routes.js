const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
const UserRoutes = express.Router();
const jwtUtils = require('../commons/jwt_function');
const UsuarioController = require('../controllers/usuario_controller');

UserRoutes.post(
    '/v1/signup',
    UsuarioController.register
);

UserRoutes.post(
    '/v1/usuario',
    jwtUtils.verifyJWT,
    UsuarioController.create
);

UserRoutes.get(
    '/v1/usuario',
    jwtUtils.verifyJWT,
    UsuarioController.getAll
);

UserRoutes.get(
    '/v1/usuario/:id',
    jwtUtils.verifyJWT,
    UsuarioController.getById
);

UserRoutes.put(
    '/v1/usuario/:id',
    jwtUtils.verifyJWT,
    UsuarioController.update
);

UserRoutes.delete(
    '/v1/usuario/:id',
    jwtUtils.verifyJWT,
    UsuarioController.delete
);

module.exports = UserRoutes;