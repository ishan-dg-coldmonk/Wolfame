const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Team = require("../models/Team")
require('dotenv').config()

const roles = ['user', 'jmcr', 'admin']

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find(req.query || {})
        res.send(teams)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        await team.populate('players')
        res.send(team)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const team = new Team({ ...req.body, createdBy: req.user._id })
        await team.save()
        res.status(201).send(team)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/approve', auth, async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(403).send({ msg: 'Only admin can approve a team.' })
        }
        const team = await Team.findByIdAndUpdate(req.body._id, { $set: { approved: req.body.approved } }, { new: true })
        res.send()
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        if (req.user.role === 'admin' || (req.user.role === 'jmcr' && req.user.residence == team.residence) || team.createdBy.toString() == req.user._id.toString()) {
            await Team.deleteOne({ _id: req.params.id })
            return res.send()
        }
        res.status(403).send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router