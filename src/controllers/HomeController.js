const HomeService = require('../services/HomeService');
const mongoose = require('mongoose');
const UserModel = require('../models/User');


module.exports = {
    count: async (req, res) => {
        try {
            const userCount = await HomeService.count(req.body);
            res.send(userCount);
        }
        catch (ex) {
            res.status(500).json({ error: ex.message });
        }
    },
}