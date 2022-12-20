const jwt = require('jsonwebtoken');

const checkUserCredential = require('./auth.controller');
const jwtSecret = require('../../config').api.jwtSecret;

const postLogin = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        checkUserCredential(email, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        rol: data.role,
                    }, jwtSecret);

                    res.status(200).json({
                        message: 'Correct credentials',
                        token
                    });
                } else {
                    res.status(400).json({ message: 'Invalid credentials' });
                }
            })
            .catch(err => {
                res.status(400).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: 'missing data',
            fields: {
                email: 'string',
                password: 'string'
            }
        });
    }
};

module.exports = { postLogin };