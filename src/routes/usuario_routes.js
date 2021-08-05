const express = require('express');
const UserRoutes = express.Router();
const jwtUtils = require('../commons/jwt_function');
const UsuarioController = require('../controllers/usuario_controller');

UserRoutes.post(
    '/v1/signup',
    UsuarioController.register
);

UserRoutes.post(
    '/v1/usuario',
    jwtUtils.JWTValidation,
    UsuarioController.create
);

UserRoutes.get(
    '/v1/usuario',
    jwtUtils.JWTValidation,
    UsuarioController.getAll
);

UserRoutes.get(
    '/v1/usuario/:id',
    jwtUtils.JWTValidation,
    UsuarioController.getById
);

UserRoutes.put(
    '/v1/usuario/:id',
    jwtUtils.JWTValidation,
    UsuarioController.update
);

UserRoutes.delete(
    '/v1/usuario/:id',
    jwtUtils.JWTValidation,
    UsuarioController.delete
);

module.exports = UserRoutes;