const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Match = require("../models/Match")
require('dotenv').config()

const roles = ['user', 'jmcr', 'admin']

router.get('/', async (req, res) => {
    try {
        const query = { ...req.query, residence: null, player: null }
        let matches = await Match.find(query).sort({time: 'ascending'}).populate({ path: 'teams', populate: { path: 'players' } })
        if (req.query.residence) {
            matches = matches.filter(({ teams }) => teams.some(({ residence }) => residence === req.query.residence))
        }
        if (req.query.player) {
            matches = matches.filter(({ teams }) => teams.some(({ players }) => players.some(({ _id }) => _id == req.query.player)))
        }
        res.send(matches)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(403).send({ msg: 'Only admin can create a match.' })
        }
        const match = new Match({ ...req.body, createdBy: req.user._id })
        await match.save()
        res.status(201).send(match)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
        if (req.user.role !== 'admin') {
            return res.status(403).send({ msg: 'Only admin can delete a match.' })
        }
        await Match.deleteOne({ _id: req.params.id })
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router