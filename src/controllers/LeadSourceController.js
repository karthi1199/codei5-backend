const LeadSourceService = require('../services/LeadSourceService');
const mongoose = require('mongoose');
const LeadSourceModel = require('../models/LeadSource');


module.exports = {
    list: async (req, res) => {
        try {
            const list = await LeadSourceService.list(req.body);
            res.send(list);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const record = await LeadSourceService.create(req.body);
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

    get: async (req, res) => {
        try {
            const record = await LeadSourceService.get(req.params.id);
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
            const record = await LeadSourceService.update(req.params.id, req.body);
            if (record) {
                return res.status(200).json({ status:true, message: 'Details Updated Successfully.' });
            }

            return res.status(401).json({ status:false, message: 'Something went wrong not yet updated.' });
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
            const record = await LeadSourceService.delete(req.params.id);
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