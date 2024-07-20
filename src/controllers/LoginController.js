const mongoose = require('mongoose');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/Jwt');

module.exports = {
    login: async (req, res, next) => {
        
        const { email, password } = req.body;

        if (typeof email !== 'undefined' && typeof password !== 'undefined') {

            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(422).json({ status: false, message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(422).json({ status: false, message: 'Incorrect password' });
            }

            const token = generateToken(user);

            if (!token) {
                return res.status(422).json({ status: false, message: 'Something went wrong...! Please try agin' });
            }

            return res.status(200).json({ data: user, token: token });
        }

        return res.status(422).json({ status: false, message: 'Check your email & password' });
    }
}