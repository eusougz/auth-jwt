const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
        return response.status(401).send({ error: 'No token provided.' });
    }

    const parts = authHeaders.split(' ');

    if (!parts.lenght === 2) {
        return response.status(401).send({ error: 'Token error' }); 
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return response.status(401).send({ error: 'Token invalid' });

        request.userId = decoded.id;
        return next();
    })

}