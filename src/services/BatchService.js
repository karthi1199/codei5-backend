const BatchModel = require('../models/Batch');

module.exports = {
    list: async (data) => {
        try {
            
            let records_count = await BatchModel.countDocuments();
            let records = await BatchModel.find();
            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {

            let record = await BatchModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    get: async (id) => {
        try {
            let record = await BatchModel.findById(id);
            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    update: async (id, fields) => {
        try{
            let record = await BatchModel.findByIdAndUpdate(id, fields);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },

    delete: async (id) =>{
        try{
            let record = await BatchModel.findByIdAndDelete(id, {deleted: true});
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}