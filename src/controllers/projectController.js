const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', (request, response) => {
    return response.send({ ok: true });
});

module.exports = app => app.use('/projects', router);
