const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Team = require("../models/Team")
require('dotenv').config()

const roles = ['user', 'jmcr', 'admin']

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
            return res.status(401).send({ msg: 'Only admin can approve a team.' })
        }
        const team = await Team.findById({ _id: req.body._id })
        team.approved = true
        await team.save()
        res.send(team)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        if(req.user.role === 'admin' || (req.user.role === 'jmcr' && req.user.residence == team.residence) || team.createdBy == req.user._id) {
            await Team.deleteOne({_id: req.params.id })
            return res.send()
        }
        res.status(401).send()
    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router