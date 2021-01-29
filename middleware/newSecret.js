const crypto = require('crypto')

module.exports = function newSecret(req, res, next) {
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
    next();
};