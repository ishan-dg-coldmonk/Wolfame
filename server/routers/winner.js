const express = require('express');
const router = new express.Router();
const Winner = require("../models/Winner");
require('dotenv').config();

// POST (create) a new winner
router.post('/', async (req, res) => {
    try {
        const winner = new Winner(req.body); // Create a new winner with the provided data
        await winner.save(); // Save the winner to the database
        res.send(winner); // Send the created winner as the response
    } catch (e) {
        res.status(500).send(); // Handle errors
    }
});

// GET all winners with optional query parameters for filtering
router.get('/', async (req, res) => {
    try {
        const winners = await Winner.find(req.query || {}).sort({ rank: 'ascending' }).populate('team'); // Find winners, sort by rank, and populate the team field
        res.send(winners); // Send the list of winners as the response
    } catch (e) {
        res.status(500).send(); // Handle errors
    }
});

// DELETE a specific winner by ID
router.delete('/:id', async (req, res) => {
    try {
        await Winner.deleteOne({ _id: req.params.id }); // Delete the winner with the specified ID
        res.send(); // Send a success response
    } catch (e) {
        res.status(500).send(); // Handle errors
    }
});

module.exports = router;