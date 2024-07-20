const UserService = require('../services/UserService');
const mongoose = require('mongoose');
const UserModel = require('../models/User');


module.exports = {
    list: async (req, res) => {
        try {
            const list = await UserService.list(req.body);
            // return res.json(list);
            res.send(list);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const mobile = req.body.mobile;
            
            const user = await UserModel.findOne({ mobile });

            if(!user){
                const record = await UserService.create(req.body);
                return res.status(200).json({ status:true, message: 'Details added Successfully.' });
            }

            return res.status(401).json({ status:false, message: 'User Already Exists' });
        } catch (error) {
            // return res.json({error});
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

    get: async (req, res) => {
        try {
            const record = await UserService.get(req.params.id);
            return res.json(record);
            res.send(record);
        }
        catch (ex) {
            res.status(500).json({ error: ex });
        }
    },

    update: async (req, res) => {
        try {
            const record = await UserService.update(req.params.id, req.body);
            return res.status(200).json({ status:true, message: 'Details Updated Successfully.' });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                const errorMessages = {};
                for (let field in error.errors) {
                    errorMessages[field] = [error.errors[field].message];
                }
                return res.status(422).json({ status:true, errors: errorMessages });
            } else {
                return res.status(500).json({ error: error.message });
            }
        }
    },

    delete: async (req, res) => {
        try {
            const record = await UserService.delete(req.params.id);
            return res.status(200).json({ status:true, message: 'Record deleted Successfully.' });
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },
}