const ContactUsService = require('../services/ContactUsService');
const mongoose = require('mongoose');
const UserModel = require('../models/User');


module.exports = {
    list: async (req, res) => {
        try {
            const list = await ContactUsService.list(req.body);
            res.send(list);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const record = await ContactUsService.create(req.body);

            return res.status(200).json({ status:true, message: 'Details added Successfully.' });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                const errorMessages = {};
                for (let field in error.errors) {
                    errorMessages[field] = [error.errors[field].message];
                }
                return res.status(422).json({ status:false, errors: errorMessages });
            } else {
                return res.status(500).json({ status:false, message: 'Server error' });
            }
        }
    },
    status: async (req, res) => {
        try {
            const list = await ContactUsService.statusUpdate(req.params.id, req.body);

            return res.status(200).json({ status:true, message: 'Details added Successfully.' });
        }
        catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                const errorMessages = {};
                for (let field in error.errors) {
                    errorMessages[field] = [error.errors[field].message];
                }
                return res.status(422).json({ status:false, errors: errorMessages });
            } else {
                return res.status(500).json({ status:false, message: 'Server error' });
            }
        }
    },
}