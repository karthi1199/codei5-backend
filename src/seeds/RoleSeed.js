  const RoleModel = require('../models/Role');


const roleSeed = async () => {
    try {

        const roles = [
            {name: 'Super Admin', access_level: 'super-admin', defined_by: 'system', status: true},
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