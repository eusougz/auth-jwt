const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(id) {
    return jwt.sign({ id }, authConfig.secret, {
        expiresIn: 172800
    });
}

router.post('/register', async (request, response) => {
    const { email } = request.body;
    
    try {
        if (await User.findOne({ email })) {
            return response.status(400).send({ error: 'Email already exists.' })
        }
        
        const user = await User.create(request.body);

        user.password = undefined;

        return response.send({ 
            user,
            token: generateToken(user.id)
        });
    } catch (err) {
        return response.status(400).send({ error: 'Registration error.' });
    }
});

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return response.status(400).send({ error: 'User not found.' });
    }

    if(!await bcrypt.compare(password, user.password)) {
        return response.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;
    
    response.send({ 
        user,
        token: generateToken(user.id)
    });
})


module.exports = app => app.use('/auth', router);
