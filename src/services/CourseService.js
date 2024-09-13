const CourseModel = require('../models/Course');
const bcrypt = require('bcrypt');

module.exports = {
    list: async (data) => {
        try {
            let records_count = await CourseModel.countDocuments();
            let records = await CourseModel.find().populate([{ path: 'trainer', select: 'first_name' },{ path: 'batch', select: 'name' }]).sort({ createdAt: -1 });

            return { count: records_count, rows: records };
        }
        catch (ex) {
            throw ex;
        }
    },

    create: async (fields) => {
        try {
            let record = await CourseModel.create(fields);

            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    get: async (id) => {
        try {
            let record = await CourseModel.findById(id).populate([{ path: 'trainer', select: 'first_name' },{ path: 'batch', select: 'name' }]);
            return record;
        }
        catch (ex) {
            throw ex;
        }
    },

    update: async (id, fields) => {
        try{
            let record = await CourseModel.findByIdAndUpdate(id, fields);
            return record;
        }
        catch (ex){
            throw ex;
        }
    },

    delete: async (id) =>{
        try{
            let record = await CourseModel.findByIdAndDelete(id, {deleted: true});
            return record;
        }
        catch (ex){
            throw ex;
        }
    },
}