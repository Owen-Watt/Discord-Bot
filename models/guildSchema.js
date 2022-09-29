const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: { type: String },  
    color: { type: String, default: "White"},
})

const model = mongoose.model("guilds", guildSchema);

module.exports = model;
