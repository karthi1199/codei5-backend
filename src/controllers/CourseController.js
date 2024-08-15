const CourseService = require('../services/CourseService');
const mongoose = require('mongoose');
const WhatsappService = require('../utils/whatsapp-service');


module.exports = {
    list: async (req, res) => {
        try {
            for (let index = 0; index < 3; index++) {
                const msgType = 'image-without-var';
                const templateName = 'welcome_message';
                const sendTo = ['919025303576'];
                const variables = [];
                const mediaUrl = 'https://ecom365.in/assets/images/site_logo/logo.png';
                let test = await WhatsappService.sendWhatsappMessage(msgType,templateName,sendTo,variables,mediaUrl);
                console.log(test);
                
            }
            
            res.send(test);
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
            const record = await UserService.update(req.params.id, req.body);
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
            const record = await UserService.delete(req.params.id);
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