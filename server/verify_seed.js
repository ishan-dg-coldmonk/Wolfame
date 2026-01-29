const mongoose = require("mongoose");
const User = require("./models/User");
const Team = require("./models/Team");
const Match = require("./models/Match");
require("dotenv").config();

const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true }).then(async () => {
    console.log("Connected. Verifying...");

    const userCount = await User.countDocuments({});
    const teamCount = await Team.countDocuments({});
    const matchCount = await Match.countDocuments({});

    console.log(`Total Users: ${userCount}`);
    console.log(`Total Teams: ${teamCount}`);
    console.log(`Total Matches: ${matchCount}`);

    // Check one team to see if players are populated
    const team = await Team.findOne({ name: /Test Team/ }).populate('players');
    if (team) {
        console.log(`Sample Team: ${team.name}`);
        console.log(`- Players count: ${team.players.length}`);
        if (team.players.length > 0) {
            // Check if population worked (if strictly ObjectId, it won't have .name property usually unless populated)
            // But wait, if population fails it stays as ID. 
            // If population succeeds, it becomes a document. 
            // Mongoose populate replaces the ID with the doc.
            console.log(`- First Player Name: ${team.players[0].name}`);
            console.log(`- First Player ID: ${team.players[0]._id}`);
        } else {
            console.log("- Player list is empty");
        }
    } else {
        console.log("No Test Team found");
    }

    // Check match
    const match = await Match.findOne({ summary: /Seed Match/ }).populate('teams');
    if (match) {
        console.log(`Sample Match: ${match.summary}`);
        console.log(`- Teams count: ${match.teams.length}`);
        if (match.teams.length > 0 && match.teams[0].name) {
            console.log(`- First Team Name: ${match.teams[0].name}`);
        }
    }

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
