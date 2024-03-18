const mongoose = require("mongoose")
require('dotenv').config();

const matchSchema = new mongoose.Schema({
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
    ],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    event: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match