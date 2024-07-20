  const RoleModel = require('../models/Role');


const roleSeed = async () => {
    try {

        const roles = [
            {name: 'Super Admin',access_level: 'super_admin',defined_by: 'system'},
            {name: 'Admin',access_level: 'admin',defined_by: 'system'},
            {name: 'Customer',access_level: 'customer',defined_by: 'system'}
        ];
        for (const role of roles) {
            const existingRole = await RoleModel.findOne({ access_level: role.access_level });
            if (!existingRole) {
                await RoleModel.create(role);
                console.log(`${role.name} Roles seeded successfully`);
            } else {
                console.log(`${role.name} Role already exists`);
            }

            
        }
    } catch (error) {
        console.error('Seeding Error:', error);
    }
};

module.exports =  roleSeed;