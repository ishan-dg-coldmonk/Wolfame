const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const url = process.env.MONGODB_URL;

// Residences from frontend/src/data/residence.js
const residences = [
    "Wolfenden Hall", "Richardson Hall", "Macdonald Hall", "Sen Hall", "Sengupta Hall",
    "LT Williams Hall", "Pandya Hall", "Sister Nivedita Ladies Hostel", "Hostel 7", "Hostel 8",
    "Hostel 9", "Hostel 10", "Hostel 11", "Hostel 13", "Hostel 14", "Hostel 15", "Hostel 16"
];

const NUM_USERS = 13;
const PASSWORD = "User@123";

async function seedUsers() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true });
        console.log("Connected to Database for seeding users");

        for (let i = 1; i <= NUM_USERS; i++) {
            const residenceName = residences[(i - 1) % residences.length];
            const email = `testuser${i}_${Date.now()}@example.com`;

            const user = new User({
                name: `Test User ${i}`,
                email: email,
                password: PASSWORD,
                residence: residenceName,
                role: 'user',
                phone_number: `98765432${(i).toString().padStart(2, '0')}`,
                linkedin: `https://linkedin.com/in/testuser${i}`
            });

            await user.save();
            console.log(`Created User: ${user.name} (${user.email}) - Residence: ${user.residence}`);
        }

        console.log("User seeding complete!");
        process.exit(0);
    } catch (e) {
        console.error("Error seeding users:", e);
        process.exit(1);
    }
}

seedUsers();
