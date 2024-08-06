const RoleModel = require('../models/Role');

module.exports = {
    list: async (data) => {
        try {
            const records_count = await RoleModel.countDocuments({access_level: { $ne: 'super-admin' }});
            const records = await RoleModel.find({access_level: { $ne: 'super-admin' }});
            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {
            fields.defined_by = 'user';
            let record = await RoleModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    get: async (id) => {
        try {
            let record = await RoleModel.findById(id);
            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    update: async (id, fields) => {
        try{
            let record = await RoleModel.findByIdAndUpdate(id, fields);
            console.log(record);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },

    delete: async (id) =>{
        try{
            let record = await RoleModel.findByIdAndDelete(id, {deleted: true});
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}