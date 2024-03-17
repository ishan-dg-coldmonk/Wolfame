const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require("../models/User")
require('dotenv').config()

const roles = ['user', 'jmcr', 'admin']

router.post('/signup', async (req, res) => {
    try {
        const isNameExist = await User.findOne({ name: req.body.name })
        if (isNameExist) {
            return res.status(403).send({msg: 'Name is already being used.'})
        }
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findByCredentials({ name }, password)
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

router.get('/getuser', async (req, res) => {
    try {
        const users = await User.findOne(req.query)
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
        Object.keys(req.body).forEach(update => { req.user[update] = req.body[update] })
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