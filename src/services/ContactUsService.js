const ContactUsModel = require('../models/ContactUs');

module.exports = {
    list: async (data) => {
        try {
            let records_count = await ContactUsModel.countDocuments();
            let records = await ContactUsModel.find();
            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {
            fields.name = fields.your-name;
            fields.mobile = fields.your-number;
            fields.email = fields.your-email;
            fields.message = fields.your-message;
            fields.status = false; // initially status pending
            let record = await ContactUsModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    statusUpdate: async (id, fields) => {
        try{
            let record = await ContactUsModel.findByIdAndUpdate(id, fields);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}