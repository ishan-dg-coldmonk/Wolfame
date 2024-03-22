const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Winner = require("../models/Winner")
require('dotenv').config()

router.post('/', auth, async (req, res) => {
    try {
        const winner = new Winner(req.body)
        await winner.save()
        res.send()
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/', async (req, res) => {
    try {
        const winners = await Winner.find(req.query || {}).sort({ rank: 'ascending' }).populate('team')
        res.send(winners)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            await Winner.deleteOne({ _id: req.params.id })
            return res.send()
        }
        res.status(403).send()
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router