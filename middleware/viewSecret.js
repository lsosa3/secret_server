const SecretsList = require('../models/SecretsList')

async function viewSecret(req, res) {
    const { hash } = req.params
    try {
        const exclude = { 
            __v: false,
            _id: false
        };
        const secret = await SecretsList.find({hash: hash}, exclude)
        if(!secret) throw new Error('Something went wrong')
        let secreto = secret[0]
        let now = new Date()
        let timestamp = Date.parse(secreto.expiresAt)
        let timestamp0 = Date.parse("1970-01-01")
        let expiresAt = new Date(timestamp)
        let initTime = new Date(timestamp0)
        if(((now > expiresAt) && (expiresAt != initTime)) || (secreto.remainingViews <= 0)){
            return res.send(false)
        }
        secreto.remainingViews--
        const updateSecret = await SecretsList.updateOne({hash: secreto.hash}, secreto)
        if(!updateSecret) throw new Error('Something went wrong update')
        res.status(200).json(secret)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = viewSecret;