const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()

const roles = ['user', 'jmcr', 'admin']

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { phone_number, password } = req.body
        const user = await User.findByCredentials({ phone_number }, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find(req.query)
        res.send(users)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        res.send(users)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/role', auth, async (req, res) => {
    const getPriority = (role) => {
        return roles.findIndex((data) => data === role)
    }
    try {
        if (getPriority(req.user.role) < getPriority(req.body.role)) {
            res.status(403).send()
        }
        const user = await User.findById(req.body._id)
        user.role = req.body.role
        user.save()
        res.send()
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/', auth, async (req, res) => {
    try {
        Object.keys(req.body).forEach(update => { if (update != 'role') { req.user[update] = req.body[update] } })
        req.user['role'] = req.user['role'] !== 'admin' ? 'user' : 'admin'
        await req.user.save()
        res.send({ user: req.user, token: req.token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.user._id })
        res.send()
    }
    catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

module.exports = router