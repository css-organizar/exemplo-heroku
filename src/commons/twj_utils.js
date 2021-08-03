const jwt = require('jsonwebtoken');

module.exports = {
    verifyJWT(req, res, next) {
        const token = req.headers['token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}