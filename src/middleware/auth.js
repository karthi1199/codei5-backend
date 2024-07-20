const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const authorizedHeaders = req.headers.authorization;

    if (!authorizedHeaders) {
        return res.status(401).json({ status: false, message: "Missing Token" });
    }

    const token = authorizedHeaders.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {

        if (err) {
            return res.status(403).json({ status: false, message: 'Invalid token' })
        }

        const user = await User.findOne({ _id: decode.id });

        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        req.user = user;
        next();
    });
}

module.exports = verifyToken