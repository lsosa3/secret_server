const { Schema, model } = require('mongoose')
//var encrypt = require('mongoose-encryption')

const SecretsListSchema = new Schema(
    {
        hash: {
            type: String,
            required: true,
        },
        secretText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,

        },
        expiresAt: {
            type: Date,
            required: true,
        },
        remainingViews: {
            type: Number,
            required: true,
        }
    }
)

/*var encKey = process.env.SOME_32BYTE_BASE64_STRING
var sigKey = process.env.SOME_64BYTE_BASE64_STRING

SecretsListSchema.plugin(encrypt, { requireAuthentication: false, encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['secretText'] })
*/
const SecretsList = model('secretsList', SecretsListSchema)

module.exports = SecretsList