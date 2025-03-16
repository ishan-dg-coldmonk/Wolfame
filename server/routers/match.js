const express = require('express');
const router = new express.Router();
const Match = require("../models/Match");
require('dotenv').config();

// GET all matches with optional filtering by residence and player
router.get('/', async (req, res) => {
    try {
        const query = { ...req.query, residence: null, player: null };
        let matches = await Match.find(query).sort({ time: 'ascending' }).populate({ path: 'teams', populate: { path: 'players' } });
        
        // Filter matches by residence if provided in the query
        if (req.query.residence) {
            matches = matches.filter(({ teams }) => teams.some(({ residence }) => residence === req.query.residence));
        }
        
        // Filter matches by player if provided in the query
        if (req.query.player) {
            matches = matches.filter(({ teams }) => teams.some(({ players }) => players.some(({ _id }) => _id == req.query.player)));
        }
        
        res.send(matches);
    } catch (e) {
        res.status(500).send();
    }
});

// GET a specific match by ID
router.get('/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id).populate({ path: 'teams', populate: { path: 'players' } });
        res.send(match);
    } catch (e) {
        res.status(500).send();
    }
});

// PATCH (update) a specific match by ID
router.patch('/:id', async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.send(match);
    } catch (e) {
        res.status(500).send();
    }
});

// POST (create) a new match
router.post('/create', async (req, res) => {
    try {
        const match = new Match({ ...req.body, createdBy: req.user ? req.user._id : null });
        await match.save();
        res.status(201).send(match);
    } catch (e) {
        res.status(500).send();
    }
});

// DELETE a specific match by ID
router.delete('/:id', async (req, res) => {
    try {
        await Match.deleteOne({ _id: req.params.id });
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;