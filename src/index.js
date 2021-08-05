const express = require('express');
const dotenv = require("dotenv-safe");
const path = require('path');
const cors = require('cors');

dotenv.config();

/**Iniciando o express */

const api = express();

/**swagger */

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

api.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

/**Adicionando Dependências ao express */

api.use(express.static(path.join(__dirname, 'public')));
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'ejs');
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

/**Importando as Rotas */

const SystemRoutes = require('./routes/system_routes');
const UserRoutes = require('./routes/usuario_routes');
const AuthenticationRoutes = require('./routes/authenticarion_routes');

/**Adicionando Rotas ao express */

api.use(AuthenticationRoutes);
api.use(UserRoutes);
api.use(SystemRoutes);

/**Start da API */

const PORT = process.env.PORT || 5000;

api.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
});