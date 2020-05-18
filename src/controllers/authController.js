const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (request, response) => {
    const { email } = request.body;
    
    try {
        if (await User.findOne({ email })) {
            return response.status(400).send({ error: 'Email already exists.' })
        }
        
        const user = await User.create(request.body);

        user.password = undefined;

        return response.send({ user });
    } catch (err) {
        return response.status(400).send({ error: 'Registration error.' });
    }
});


module.exports = app => app.use('/auth', router);
