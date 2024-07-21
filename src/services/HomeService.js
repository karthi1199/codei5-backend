const UserModel = require('../models/User');
const RoleModel = require('../models/Role');

module.exports = {
    count: async (data) => {
        try {
            const adminRole   = await RoleModel.findOne({ access_level: 'super_admin' });
            const adminRoleId = adminRole._id;
            let records_count = await UserModel.countDocuments({role: { $ne: adminRoleId }});
            
            return { userCount: records_count };
        }
        catch (ex) {
            throw ex;
        }
    },
}