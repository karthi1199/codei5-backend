const CourseService = require('../services/CourseService');
const mongoose = require('mongoose');


module.exports = {
    list: async (req, res) => {
        try {
            const list = await CourseService.list(req.body);
            res.send(list);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },

    create: async (req, res, next) => {
        try {
            const record = await CourseService.create(req.body);
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
            const record = await CourseService.get(req.params.id);
            if (record) {
                res.send(record);
            }

            return res.status(401).json({ status:false, message: '_id Not Found.' });
        }
        catch (ex) {
            res.status(500).json({ error: ex });
        }
    },

    update: async (req, res) => {
        try {
            const record = await CourseService.update(req.params.id, req.body);
            if (record) {
                return res.status(200).json({ status:true, message: 'Details Updated Successfully.' });
            }
            return res.status(401).json({ status:false, message: '_id Not Found.' });
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
            const record = await CourseService.delete(req.params.id);
            if (record) {
                return res.status(200).json({ status:true, message: 'Record deleted Successfully.' });
            }
            return res.status(422).json({ status:true, errors: errorMessages });
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },
}