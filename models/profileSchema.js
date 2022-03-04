const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    hugCounter: { type: Number, default: 0}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;