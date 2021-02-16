require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const secretsRoutes = require('./routes/api/secret')
const crypto = require('crypto')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/secret', secretsRoutes)

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB database Connected ...'))
.catch((err) => console.log(err))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))