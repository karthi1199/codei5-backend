require("../../config/db");
require("dotenv").config();
const userSeed = require("../seeds/UserSeed");
const roleSeed = require("../seeds/RoleSeed");

const startSeeding = async () => {
    try {
        console.log('Seed [started] please wait..');
        await roleSeed();
        await userSeed();
        console.log('Seed completed successfully.');
    } catch (error) {
        console.error('Seeding failed:', error.message);
    }
};

startSeeding();