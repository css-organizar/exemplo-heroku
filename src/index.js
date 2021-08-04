const express = require('express');

/**Utilitários para trabalhar com caminhos de arquivos e diretórios */

const dotenv = require("dotenv-safe");
const path = require('path');
const cors = require('cors');

/**Controle de URL */

var url = require('url');

function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

/**Definição da porta para START da API */

const PORT = process.env.PORT || 5000;

/**Iniciando o express */

const applicationServer = express();

/**swagger */

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

applicationServer.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

/**Iniciando a API */

dotenv.config();

applicationServer.use(express.static(path.join(__dirname, 'public')));
applicationServer.set('views', path.join(__dirname, 'views'));
applicationServer.set('view engine', 'ejs');
applicationServer.use(cors());
applicationServer.use(express.json());
applicationServer.use(express.urlencoded({ extended: true }));

/**Routes */

const UserRoutes = require('./routes/usuario_routes');
const AuthenticationRoutes = require('./routes/authenticarion_routes');

applicationServer.use(AuthenticationRoutes);
applicationServer.use(UserRoutes);

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`));