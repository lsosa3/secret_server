const { Router } = require('express')
const SecretsList = require('../../models/SecretsList')
const newSecret = require('../../middleware/newSecret');
const viewSecret = require('../../middleware/viewSecret');

const router = Router()

router.get('/', async (req, res) => {
    try {
        const secretsList = await SecretsList.find()
        if (!secretsList) throw new Error('No Secrets')
        const sorted = secretsList.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
})

router.post('/', newSecret)

router.get('/:hash', viewSecret)

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await SecretsList.findByIdAndUpdate(id, req.body)
        if(!response) throw new Error('Something went wrong')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await SecretsList.findByIdAndDelete(id)
        if(!removed) throw new Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router