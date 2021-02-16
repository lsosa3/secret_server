const SecretsList = require('../models/SecretsList')
const crypto = require('crypto')

async function newSecret(req, res) {
    try {
        let createdAt = new Date()
        if(req.body.ttl > 0) {
            let expiresAt = new Date(createdAt.getTime() + req.body.ttl*60000)
            req.body.expiresAt = expiresAt
        }
        else {
            req.body.expiresAt = 0
        }
        req.body.createdAt = createdAt
        req.body.hash = crypto.createHash('sha1').update(req.body.secretText).digest('hex'); 
        const newSecretsList = new SecretsList(req.body)
        const secretsList = await newSecretsList.save()
        if(!secretsList) throw new Error('Something went wrong saving the secret')
        res.status(200).json(secretsList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = newSecret;
