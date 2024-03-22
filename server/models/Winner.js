const mongoose = require("mongoose")
require('dotenv').config();

const winnerSchema = new mongoose.Schema({
    team:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    rank: {
        type: Number,
        min: [1, 'Rank shoulb be atleast 1'],
    },
    event: {
        type: String,
        required: true,
    },
    category: {
        type: String
    },
})

const Winner = mongoose.model('Winner', winnerSchema)

module.exports = Winner