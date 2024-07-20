const UserService = require('../services/UserService');  
const UserModel = require('../models/User');
const RoleModel = require('../models/Role');


const userSeed = async () => {
    try {
        const role   = await RoleModel.findOne({ access_level: 'super_admin'});
        const roleId = role._id;

        const admin  = {first_name: 'Cloud i5',last_name: 'admin',role: roleId,email: 'admin@gmail.com',mobile: '9025303576',
            password: '12345678',image: 'null',designation: 'null',date_of_joining: 'null',status: true,
        };
        
        const checkExist = await UserModel.findOne({ email: admin.email });

        if (!checkExist) {
            await UserService.create(admin);
            console.log('Admin seeded successfully');
        } else {
            console.error('Admin already exists');
        }
    } catch (error) {
        console.error('Seeding Error:', error);
    } finally {
        process.exit();
    }
};

module.exports =  userSeed;