const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, { expiresIn : '120m' });

module.exports = generateToken