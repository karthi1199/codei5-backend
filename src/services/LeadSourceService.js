const LeadSourceModel = require('../models/LeadSource');

module.exports = {
    list: async (data) => {
        try {
            
            let records_count = await LeadSourceModel.countDocuments();
            let records = await LeadSourceModel.find();
            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {

            let record = await LeadSourceModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    get: async (id) => {
        try {
            let record = await LeadSourceModel.findById(id);
            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    update: async (id, fields) => {
        try{
            let record = await LeadSourceModel.findByIdAndUpdate(id, fields);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },

    delete: async (id) =>{
        try{
            let record = await LeadSourceModel.findByIdAndDelete(id, {deleted: true});
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}