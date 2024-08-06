const RoleService = require('../services/RoleService');
const RoleModel = require('../models/Role');
const slugify = require('slugify');
const mongoose = require('mongoose');


module.exports = {
    list: async (req, res) => {
        try {
            const list = await RoleService.list(req.body);
            res.send(list);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const name = req.body.name;
            const access_level = slugify(name, { lower: true });
            const role = await RoleModel.countDocuments({access_level: { $eq: access_level }});
            
            if(!role){
                req.body.access_level = access_level;
                const record = await RoleService.create(req.body);
                return res.status(200).json({ status:true, message: 'Details added Successfully.' });
            }

            return res.status(401).json({ status:false, message: 'Roles Already Exists' });
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

    get: async (req, res) => {
        try {
            const record = await RoleService.get(req.params.id);
            if (record) {
                return res.send(record);
            }

            return res.status(401).json({ status:false, message: '_id Not Found.' });
        }
        catch (ex) {
            res.status(500).json({ error: ex });
        }
    },

    update: async (req, res) => {
        try {
            const name = req.body.name;
            const _id  = req.params.id;
            const access_level = slugify(name, { lower: true });
            const role = await RoleModel.findOne({
                                                $and: [
                                                    { access_level: access_level },
                                                    { access_level: { $ne: 'super-admin' } },
                                                    { _id: { $ne: _id } }
                                                ]});
            
            if(!role){
                req.body.access_level = access_level;
                const record = await RoleService.update(req.params.id, req.body);
                if (record) {
                    return res.status(200).json({ status:true, message: 'Details Updated Successfully.' });
                }
                return res.status(401).json({ status:false, message: 'Something went wrong not yet updated.' });
            }
            return res.status(401).json({ status:false, message: 'Roles Already Exists' });
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
            const record = await RoleService.delete(req.params.id);
            if (record) {
                return res.status(200).json({ status:true, message: 'Record deleted Successfully.' });
            }
            return res.status(401).json({ status:false, message: 'Something went wrong record not deleted.' });
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },
}