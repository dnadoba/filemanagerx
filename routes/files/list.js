const express = require('express')
const router = express.Router()
const renderList = require('./renderList')

router.get('/list*', renderList.forPublic)

module.exports = router
