const SecretsList = require('../models/SecretsList')

module.exports = function viewSecret(req, res, next) {
    let oldSend = res.send
    let dats = []
    res.send = function (data) {
        try {
            dats = JSON.parse(data)
            dats = dats[0]
            let now = new Date()
            let timestamp = Date.parse(dats.expiresAt)
            let timestamp0 = Date.parse("1970-01-01")
            let expiresAt = new Date(timestamp)
            let initTime = new Date(timestamp0)
            res.send = oldSend
            if(((now > expiresAt) && (expiresAt != initTime)) || (dats.remainingViews <= 0)){
                return res.send(false)
            }
            dats.remainingViews--
            SecretsList.updateOne({hash: dats.hash}, dats).then(
                () => {
                    console.log('Updated')
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            );
        }
        catch(error) {
            console.log(error.message)
        }
        return res.send(data)
    }
    next()
};