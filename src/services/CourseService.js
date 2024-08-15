const UserModel = require('../models/User');
const RoleModel = require('../models/Role');
const bcrypt = require('bcrypt');

module.exports = {
    list: async (data) => {
        try {
            let records_count = await UserModel.countDocuments();
            let records = await UserModel.find();
            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {
            
            fields.password  = await bcrypt.hash(fields.password, 10); 
            
            let record = await UserModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    get: async (id) => {
        try {
            let record = await UserModel.findById(id);
            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    update: async (id, fields) => {
        try{
            let record = await UserModel.findByIdAndUpdate(id, fields);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },

    delete: async (id) =>{
        try{
            let record = await UserModel.findByIdAndDelete(id, {deleted: true});
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}