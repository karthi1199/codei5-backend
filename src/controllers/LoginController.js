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

            res.cookie('AccessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000,
            });

            return res.status(200).json({ data: {'id': user._id, 'first_name': user.last_name, 'email': user.email, 'bearer_token': token} });
        }

        return res.status(422).json({ status: false, message: 'Check your email & password' });
    },

    logout: async (req, res, next) => {
        
        try {
            res.cookie("AccessToken", "", {maxAge: 0, httpOnly: false});
            res.status(200).json({message: "successfully logout"});
        } catch (error) {
            res.status(400).json({message: error.message,
            });
            console.log("Logout:", error.message);
        }
    }
   
}