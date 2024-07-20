const mongoose = require('mongoose');
const UserModel = require('../models/User');

module.exports = {
    show: async (req, res) => {
        try {
            const record = await UserModel.findById(req.params.id)
            .populate('role')
            .exec();
            res.send(record);
        }
        catch (ex) {
            res.status(500).json({ error: ex });
        }
    }
}
