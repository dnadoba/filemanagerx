const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'pug')

app.use(require('./routes/login'))
app.use(require('./routes/logout'))
app.use(require('./routes/files/list'))
app.use(require('./routes/files/delete'))
app.use(require('./routes/files/upload'))

module.exports = app