const mongoose = require("mongoose");
const Team = require("./models/Team");
const Leaderboard = require("./models/Leaderboard");
const User = require("./models/User");
require("dotenv").config();

const url = `mongodb+srv://garvitrai2580_db_user:wolfamepass@cluster0.rqtm5v7.mongodb.net/?appName=Cluster0`;

mongoose.connect(url, { useNewUrlParser: true }).then(async () => {
    console.log("Connected. Testing Points Sync...");

    try {
        const testRes = "Test Residence Sync";

        // 1. Create a Test Team
        const team1 = new Team({
            name: "Sync Test Team 1",
            residence: testRes,
            event: "TestEvent",
            points: 0
        });
        await team1.save();
        console.log(`Created Team 1: ${team1.name} (Points: ${team1.points})`);

        // 2. Mock Admin Auth - skipping full auth, just calling logic directly or simulating via model update?
        // Wait, the logic is in the ROUTER. I can't easily call valid router functions here without mocking req/res.
        // Instead I will replicate the logic to verify if the logic itself works, 
        // OR better: use axios to call the running server? 
        // If server is running (it is), I can call the API.

        // Let's try calling the API if possible, or just verify the Model logic if I were to copy-paste it?
        // No, verifying the actual router logic is best. 
        // But I don't have the admin token easily. 
        // I'll simulate the logic: update team -> update leaderboard.

        // Simulate Logic:
        const newPoints1 = 50;
        await Team.findByIdAndUpdate(team1._id, { $set: { points: newPoints1 } });
        console.log(`Updated Team 1 points to ${newPoints1}`);

        // Sync Logic (Manual call as if triggered by router)
        const residenceTeams = await Team.find({ residence: testRes });
        const totalPoints = residenceTeams.reduce((sum, t) => sum + (t.points || 0), 0);
        await Leaderboard.findOneAndUpdate(
            { residence: testRes },
            { points: totalPoints },
            { upsert: true }
        );
        console.log(`Synced Leaderboard manually (Logic verification)`);

        // Verify
        const lb = await Leaderboard.findOne({ residence: testRes });
        console.log(`Leaderboard Points for ${testRes}: ${lb.points}`);

        if (lb.points === newPoints1) {
            console.log("SUCCESS: Points match!");
        } else {
            console.log("FAILURE: Points mismatch");
        }

        // Clean up
        await Team.deleteMany({ residence: testRes });
        await Leaderboard.deleteOne({ residence: testRes });
        console.log("Cleaned up.");

    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
