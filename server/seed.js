const mongoose = require("mongoose");
const User = require("./models/User");
const Team = require("./models/Team");
const Match = require("./models/Match");
require("dotenv").config();

// Using the same connection string found in db/mongoose.js
const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to Database for seeding");
    seed();
}).catch(err => {
    console.error("Error connecting to Database", err);
});

const sampleResidences = ["Hostel A", "Hostel B", "Hostel C", "Hostel D"];
// const sampleEvents = ["Football", "Cricket", "Basketball", "Volleyball"]; // Keeping it simple with Football for matches

async function seed() {
    try {
        console.log("Starting seed...");

        // 1. Find Admin
        const admin = await User.findOne({ role: 'admin' });
        const createdBy = admin ? admin._id : null;
        if (createdBy) {
            console.log(`Found admin: ${admin.name} (using for createdBy fields)`);
        } else {
            console.log("Warning: No admin found, createdBy fields will be null (or assigned to a player)");
        }

        // 2. Create Players
        console.log("Creating Players...");
        const players = [];
        for (let i = 1; i <= 20; i++) {
            // Check if player exists to avoid duplicates if run multiple times, or just create unique emails
            const email = `testplayer${i}_${Date.now()}@example.com`;

            const player = new User({
                name: `Test Player ${i}`,
                email: email,
                residence: sampleResidences[i % 4],
                password: 'password123', // Will be hashed
                role: 'user',
                phone_number: `123456789${i % 10}`,
                linkedin: `https://linkedin.com/in/testplayer${i}`
            });

            await player.save();
            players.push(player);
        }
        console.log(`Created ${players.length} players.`);

        // 3. Create Teams
        console.log("Creating Teams...");
        const teams = [];
        for (let i = 0; i < 4; i++) {
            const teamPlayers = players.slice(i * 5, (i + 1) * 5); // 5 players per team
            const teamCaptain = teamPlayers[0];

            const team = new Team({
                name: `Test Team ${i + 1} (${sampleResidences[i]})`,
                players: teamPlayers.map(p => p._id),
                residence: sampleResidences[i],
                event: 'Football',
                approved: true,
                createdBy: createdBy || teamCaptain._id
            });

            await team.save();
            teams.push(team);
            console.log(`Created team: ${team.name}`);
        }

        // 4. Create Matches
        console.log("Creating Matches...");

        // Match 1: Team 1 vs Team 2
        const match1 = new Match({
            teams: [teams[0]._id, teams[1]._id],
            event: 'Football',
            time: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
            createdBy: createdBy,
            summary: "Seed Match 1: Team 1 vs Team 2"
        });
        await match1.save();
        console.log("Created Match 1");

        // Match 2: Team 3 vs Team 4
        const match2 = new Match({
            teams: [teams[2]._id, teams[3]._id],
            event: 'Football',
            time: new Date(new Date().getTime() + 48 * 60 * 60 * 1000), // Day after tomorrow
            createdBy: createdBy,
            summary: "Seed Match 2: Team 3 vs Team 4"
        });
        await match2.save();
        console.log("Created Match 2");

        console.log("Seeding complete!");
        process.exit(0);

    } catch (e) {
        console.error("Error during seeding:", e);
        process.exit(1);
    }
}
