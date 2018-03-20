const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(require('./routes/files/list'))
app.use(require('./routes/files/download'))
app.use(require('./routes/admin/list'))


// redirects
app.get("/", function(req, res) {
  res.redirect("/list")
})
app.get("/admin", function(req, res) {
    res.redirect("/admin/list")
})
module.exports = app
