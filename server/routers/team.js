const express = require('express');
const router = new express.Router();
const Team = require("../models/Team");
require('dotenv').config();

// GET all teams with optional query parameters for filtering
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find(req.query || {}).sort({ residence: 'ascending' });
        res.send(teams);
    } catch (e) {
        res.status(500).send();
    }
});

// GET a specific team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        await team.populate('players'); // Populate the players field
        res.send(team);
    } catch (e) {
        res.status(500).send();
    }
});

// POST (create) a new team
router.post('/', async (req, res) => {
    try {
        const team = new Team({ ...req.body, createdBy: null }); // createdBy is set to null since authentication is not required
        await team.save();
        res.status(201).send(team);
    } catch (e) {
        res.status(500).send();
    }
});

// PATCH (update) a specific team by ID
router.patch('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.send(team);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// DELETE a specific team by ID
router.delete('/:id', async (req, res) => {
    try {
        await Team.deleteOne({ _id: req.params.id });
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;