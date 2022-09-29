const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: String },
    Hugs_Received: { type: Number, default: 0},
    Hugs_Given: { type: Number, default: 0},
    Stabs_Received: { type: Number, default: 0},
    Stabs_Given: { type: Number, default: 0 },
    Punches_Received: { type: Number, default: 0},
    Punches_Given: { type: Number, default: 0 },
    Slaps_Given: { type: Number, default: 0 },
    Slaps_Received: { type: Number, default: 0 },
    Kisses_Given: { type: Number, default: 0 },
    Kisses_Received: { type: Number, default: 0 },
    cash: { type: Number, default: 50000},
    Tax_Paid: { type: Number, default: 0 },
    Coinflip_Wins: { type: Number, default: 0 },
    Coinflip_Loses: { type: Number, default: 0 },
    Coinflip_Profit: { type: Number, default: 0 },
    dailyClaimed: { type: Number, default: 0 }
})

const model = mongoose.model("users", userSchema);

module.exports = model;

